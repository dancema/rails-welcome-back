import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';


class StarcodeSearchForm extends Component {


  redirectToStarsValidation = (values,actions) => {
    this.props.history.push(`/c/code/${values.starcode}`)
  }



  render () {
      return (
      <div>
        <h2>Entrez le code</h2>
        <Formik
          initialValues={{
            starcode: ""
          }}
          validationSchema={Yup.object({
            starcode: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
          })}
          onSubmit={(values,actions) => {
            this.redirectToStarsValidation(values,actions)
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
                <Field type="text" name="starcode" />
                <ErrorMessage name="starcode" component="div" />
                <button type="submit" disabled={isSubmitting} >
                 Valider
                </button>
            </Form>
          )}
        </Formik>
    </div>
      )
  }
}


export default withRouter(StarcodeSearchForm);


