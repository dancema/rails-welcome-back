import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Popup from '../components/popup'

class LogIn extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,
      restaurant_id: null,
      restaurant_name: null,
      signIn: null,
      activationStarcode: false,
      showPopup: false
    }
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
      console.log(response)
      actions.setSubmitting(false);
      this.setState({signIn: 'connexion réussie'});
    })
    .catch((error) => {
      if (error.response) {
        actions.setSubmitting(false);
        console.log(error.response);
        this.setState({signIn: 'identifiants invalides'});
      }
    });

  }

  componentDidMount() {

  }


  render () {

    return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
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
    </div>
  )}
};

function mapStateToProps(state, ownProps) {
  const starcode = ownProps.match.params.code;
  return {
    starcode: starcode,
    isLoggedIn : state.isLoggedIn
  }
}



export default withRouter(connect(mapStateToProps, null)(LogIn));


