import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { isLoggedIn } from '../actions/index';


import Popup from '../components/popup'

class StarcodeValidation extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,
      restaurant_id: null,
      restaurant_name: null,
      signIn: null,
      activationStarcode: false,
      showPopup: false,
      error_msg: null,
      signIn_option: false,
      signUp : false
    }
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.props.history.push(`/c/restaurants/${this.state.restaurant_id}`)
  }




  checkStarcode = (starcode) => {
    axios.get(`/api/v1/starcodes?code=${starcode}`,
      { withCredentials: true })
      .then((response) => {
        this.setState({restaurant_name: response.data.restaurant_name, restaurant_id: response.data.restaurant_id,isLoading: false})
      })
      .catch((er) => {
        if (er.response){
          if(er.response.status == 409) {
            this.setState({isLoading: false, error_msg: "Code déjà utilisé"})
          } else {
            this.setState({isLoading: false, error_msg: "Code incorrect"})
          }
        }
      }
    )}



  activationStarcode = (values, actions) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';


    let data = JSON.stringify({code: values.code})
    axios.post('/api/v1/starcodes', data
    )
    .then((response) => {
      this.setState({activationStarcode: true, showPopup: true});

    })
    .catch((error) => {
      if (error.response) {
        actions.setSubmitting(false);
        this.setState({activationStarcode: false});
      }
    });
  }

  signUp = (values,actions) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';

    let data = JSON.stringify({user:{
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    }})


    axios.post('/api/v1/registrations', data
    )
    .then((response) => {
      this.setState({signUp: "creation de compte reussie"});
      this.activationStarcode(values,actions)
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status == 409){
          actions.setSubmitting(false);
          this.setState({signUp: error.response.data.message });
        } else {
          actions.setSubmitting(false);
          this.setState({signUp: "le compte n'a pas pu se créer, réessayer plus tard"});
        }
      }
    });

  }

  signIn = (values,actions) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';


    let data = JSON.stringify({user:{
      email: values.email,
      password: values.password
    }})

    console.log('helloooo')
    axios.post('/login', data
    )
    .then((response) => {
      this.setState({signIn: 'connexion réussie'});
      this.activationStarcode(values,actions)
    })
    .catch((error) => {
      if (error.response) {
        actions.setSubmitting(false);
        this.setState({signIn: 'identifiants invalides'});
      }
    });

  }

  componentDidMount() {
    this.checkStarcode(this.props.match.params.code)
    if (this.props.logged_in === null) {
      this.props.dispatch(isLoggedIn())
    }
  }


  render () {
    if (this.state.isLoading === true ) {
      return <div>Loading ...........</div>
    } else if (this.props.loading_user === true ){
      return (
        <div>Loading ...........</div>
        )
    } else if (this.state.restaurant_name == null ){
      return (
        <div>
          <h1>{this.state.error_msg}</h1>
          <Link to={`/c/code`} >
            <div className="btn btn-secondary">Entrer le code manuellement</div>
          </Link>
        </div>
      )
    } else if (this.state.restaurant_name != null && this.props.logged_in) {
      return (
      <div>
        <h1>Bravo !</h1>
        <h2>Pour gagner un point chez {this.state.restaurant_name}, continue !</h2>
        <Formik
          initialValues={{
            code: this.props.match.params.code,
          }}
          enableReinitialize={true}
          validationSchema={Yup.object({
            code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
          })}
          onSubmit={(values,actions) => {
            this.activationStarcode(values,actions)
          }}
          >
          {({values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit,
             isSubmitting}) => (
             <Form>
                <Field type="text" name="code" readOnly className="d-none"/>
                <button type="submit" disabled={isSubmitting} >
                 Valider
                </button>
            </Form>
          )}
        </Formik>
        {this.state.showPopup ?
          <Popup
            text='Code validé ! Tu as gagné un point :)'
            restaurant_id={this.state.restaurant_id}
          />
          : null
        }
    </div>
      )
    } else if (this.state.restaurant_name != null && this.props.logged_in==false && this.state.signIn_option == true) {
    return (
    <div>

      <h1>Bravo !</h1>
      <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
      <Formik
        initialValues={{
          code: this.props.match.params.code,
          email: '',
          password: ''
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
          email: Yup.string().email('Invalid email address').required('required'),
          password: Yup.string().required('required'),
        })}
        onSubmit={(values,actions) => {
          this.signIn(values,actions)
        }}
        >
        {({values,
           errors,
           touched,
           handleChange,
           handleBlur,
           handleSubmit,
           isSubmitting}) => (
           <Form>
              <Field type="text" name="code" readOnly className="d-none"/>
              <Field type="email" name="email" placeholder="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" placeholder="mot de passe" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting} >
               Submit
              </button>
              {this.state.signIn && (
                  <p className="">
                    {this.state.signIn}
                  </p>
                )}
          </Form>
        )}
      </Formik>
      {this.state.showPopup ?
        <Popup
          text='Code validé ! Tu as gagné un point :)'
          restaurant_id={this.state.restaurant_id}
        />
        : null
      }
      <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
          {this.state.signIn_option ?
            <p>Créer un compte</p>
            : <p>J'ai déjà un compte</p>
          }
      </div>
    </div>)}
    else if (this.state.restaurant_name != null && this.props.logged_in==false && this.state.signIn_option == false) {
      return (

        <div>
          <h1>Bravo !</h1>
          <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
          <Formik
            initialValues={{
              code: this.props.match.params.code,
              email: '',
              password: '',
              password_confirmation:''
            }}
            enableReinitialize={true}
            validationSchema={Yup.object({
              code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
              email: Yup.string().email('Invalid email address').required('required'),
              password: Yup.string().required('Password is required').min(6, "Doit contenir 6 charactères minimum"),
              password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={(values,actions) => {
              this.signUp(values,actions)
            }}
            >
            {({values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting}) => (
               <Form>
                  <Field type="text" name="code" readOnly className="d-none"/>
                  <Field type="email" name="email" placeholder="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="password" name="password" placeholder="mot de passe" />
                  <ErrorMessage name="password" component="div" />
                  <Field type="password" name="password_confirmation" placeholder="confirmer mot de passe" />
                  <ErrorMessage name="password_confirmation" component="div" />
                  <button type="submit" disabled={isSubmitting} >
                   Submit
                  </button>
                  {this.state.signUp && (
                      <p className="">
                        {this.state.signUp}
                      </p>
                    )}
              </Form>
            )}
          </Formik>
          {this.state.showPopup ?
            <Popup
              text='Compte créé et Code validé ! Tu as gagné un point :)'
              restaurant_id={this.state.restaurant_id}
            />
            : null
          }

          <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
              {this.state.signIn_option ?
                <p>Créer un compte</p>
                : <p>J'ai déjà un compte</p>
              }
          </div>
        </div>

    )}
  ;}
}



function mapStateToProps(state, ownProps) {
  let logged_in = null
  let loading_user = false
  if (state.logged_in) {
    logged_in = state.logged_in.logged_in
    loading_user = state.logged_in.loading_user;
  }
  return { logged_in, loading_user }
}



export default withRouter(connect(mapStateToProps, null )(StarcodeValidation));


