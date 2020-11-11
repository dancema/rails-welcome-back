import React, { useState, Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';





class StarsValidation extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,
      restaurant_name: null
    }
  }

  checkStarcode = (starcode) => {
    axios.get(`/api/v1/starcodes/${starcode}`,
      { withCredentials: true })
      .then((response) => {
        this.setState({restaurant_name: response.data.restaurant_name, isLoading: false})
      })
      .catch((er) => {
        if(er.response) {
          this.setState({isLoading: false})
        }
      })
  }


  signIn = (email,password) => {
    console.log(email)
    console.log(password)
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true

    let data = JSON.stringify({user:{
      email: email,
      password: password
    }})

    axios.post('/api/v1/users/sign_in', data
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  componentDidMount() {
    this.checkStarcode(this.props.starcode)

  }


  render () {
    {console.log(this.state)}
    if (this.state.isLoading == true) {
      return <div>Loading ...........</div>
    } else if (this.state.restaurant_name == null ){
      return <div>Code incorrect ! Reesayer</div>
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
        onSubmit={values => {
          this.signIn(values.email,values.password)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
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
              <button type="submit" >
               Submit
              </button>
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
    isLoggedIn : state.isLoggedIn
  }
}



export default connect(mapStateToProps, null)(StarsValidation);


