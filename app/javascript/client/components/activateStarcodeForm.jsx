// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom';

// import React, { useState, Component, PureComponent } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';





// class ActivateStarcodeForm extends Component {

//   activationStarcode = (values, actions) => {
//     let data = JSON.stringify({code: values.code})
//     const callback = this.props.togglePopup()
//     this.props.activateStarcode(data, callback)
//   }

//   render(){

//     return (
//       <Formik
//         initialValues={{
//           code: this.props.match.params.code,
//         }}
//         enableReinitialize={true}
//         validationSchema={Yup.object({
//           code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
//         })}
//         onSubmit={(values,actions) => {
//           this.activationStarcode(values,actions)
//         }}
//         >
//         {({values,
//            errors,
//            touched,
//            handleChange,
//            handleBlur,
//            handleSubmit,
//            isSubmitting}) => (
//            <Form>
//               <Field type="text" name="code" className="d-none"/>
//               <button type="submit" disabled={isSubmitting} >
//                Valider
//               </button>
//           </Form>
//         )}
//       </Formik>
//     );
//   }
// }



// export default ActivateStarcodeForm;
