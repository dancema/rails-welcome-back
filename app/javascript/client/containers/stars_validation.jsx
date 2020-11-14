import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { isLoggedIn } from '../actions/index';


import Popup from '../components/popup'

class StarsValidation extends Component {
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
    }
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
    this.props.history.push(`/c/restaurants/${this.state.restaurant_id}`)
  }




  checkStarcode = (starcode) => {
    axios.get(`/api/v1/starcodes/${starcode}`,
      { withCredentials: true })
      .then((response) => {
        this.setState({restaurant_name: response.data.restaurant_name, restaurant_id: response.data.restaurant_id,isLoading: false})
      })
      .catch((er) => {
        if(er.response.status == 409) {
          this.setState({isLoading: false, error_msg: "Code déjà utilisé"})
        } else {
          this.setState({isLoading: false, error_msg: "Code incorrect"})
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
    this.checkStarcode(this.props.starcode)
    this.props.isLoggedIn()
  }


  render () {
    if (this.state.isLoading == true) {
      return <div>Loading ...........</div>
    } else if (this.state.restaurant_name == null ){
      return (
        <div>
          <h1>{this.state.error_msg}</h1>
          <Link to={`/c/stars`} >
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
            code: this.props.starcode,
          }}
          enableReinitialize={true}
          validationSchema={Yup.object({
            code: Yup.string().length(8, 'Ne contient pas 8 charactères').required('required'),
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
                <Field type="text" name="starcode" readOnly className="d-none"/>
                <button type="submit" disabled={isSubmitting} >
                 Valider
                </button>
                {this.state.showPopup ?
                  <Popup
                    text='Code validé ! Tu as gagné un point :)'
                    closePopup={this.togglePopup.bind(this)}
                  />
                  : null
                }
            </Form>
          )}
        </Formik>
    </div>
      )
    } else if (this.state.restaurant_name != null) {
    return (
    <div>

      <h1>Bravo !</h1>
      <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
      <Formik
        initialValues={{
          code: this.props.starcode,
          email: '',
          password: ''
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          code: Yup.string().length(8, 'Ne contient pas 8 charactères').required('required'),
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
              <Field type="text" name="starcode" readOnly className="d-none"/>
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
              {this.state.showPopup ?
                <Popup
                  text='Code validé ! Tu as gagné un point :)'
                  closePopup={this.togglePopup.bind(this)}
                />
                : null
              }
          </Form>
        )}
      </Formik>
    </div>
  )}
};}

function mapStateToProps(state, ownProps) {
  const starcode = ownProps.match.params.code;
  return {
    starcode: starcode,
    logged_in : state.logged_in
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isLoggedIn }, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps )(StarsValidation));


