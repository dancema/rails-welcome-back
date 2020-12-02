// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom';

// import React, { useState, Component, PureComponent } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';



// // const propTypes = {
// //   restaurant: PropTypes.object.isRequired,
// // };



// class SignInForm extends Component {


//   render() {
//     return (
//         <Formik
//           initialValues={{
//             email: '',
//             password: ''
//           }}
//           enableReinitialize={true}
//           validationSchema={Yup.object({
//             email: Yup.string().email('Invalid email address').required('required'),
//             password: Yup.string().required('required'),
//           })}
//           onSubmit={(values,actions) => {
//             this.props.logIn(values)
//           }}
//           >
//           {({values,
//              errors,
//              touched,
//              handleChange,
//              handleBlur,
//              handleSubmit,
//              isSubmitting}) => (
//              <Form>
//                 <Field type="text" name="code" className="d-none"/>
//                 <Field type="email" name="email" placeholder="email" />
//                 <ErrorMessage name="email" component="div" />
//                 <Field type="password" name="password" placeholder="mot de passe" />
//                 <ErrorMessage name="password" component="div" />
//                 <button type="submit" disabled={isSubmitting} >
//                  Submit
//                 </button>
//                 {this.props.error_user && (<p>Identifiants incorrects</p>)}
//             </Form>
//           )}
//         </Formik>
//     );
//   }
// }


// // Restaurant.propTypes = propTypes;

// export default SignInForm;
