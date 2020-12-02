// import React, { useState, Component, PureComponent } from 'react';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';

// // import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
// import { bindActionCreators } from 'redux'
// import { isLoggedIn, logIn, activateStarcode, logInAndActivateStarcode} from '../actions/index';


// import Popup from '../components/popup';
// import ActivateStarcodeForm from '../components/activateStarcodeForm';
// import SignInAndActivateStarcodeForm from '../components/signInAndActivateStarcodeForm';


// class StarsValidation extends Component {
//   constructor(){
//     super()
//     this.state = {
//       isLoading: true,
//       restaurant_id: null,
//       restaurant_name: null,
//       showPopup: false,
//       error_msg: null,
//       signIn_option: false,
//       signUp : false
//     }
//   }

//   togglePopup = () => {
//     this.setState({
//       showPopup: !this.state.showPopup
//     });
//   }

//   closePopup = () => {
//     this.props.history.push(`/c/restaurants/${this.state.restaurant_id}`)
//   }



//   checkStarcode = (starcode) => {
//     axios.get(`/api/v1/starcodes?code=${starcode}`,
//       { withCredentials: true })
//       .then((response) => {
//         this.setState({restaurant_name: response.data.restaurant_name, restaurant_id: response.data.restaurant_id,isLoading: false})
//       })
//       .catch((er) => {
//         if (er.response){
//           if(er.response.status == 409) {
//             this.setState({isLoading: false, error_msg: "Code déjà utilisé"})
//           } else {
//             this.setState({isLoading: false, error_msg: "Code incorrect"})
//           }
//         }
//       }
//     )}



//   // activationStarcode = (values, actions) => {
//   //   let data = JSON.stringify({code: values.code})
//   //   this.props.activateStarcode(data, callback).then(() => {
//   //     this.setState({showPopup: true});
//   //   })
//   // }


//   componentDidMount() {
//     this.checkStarcode(this.props.match.params.code)
//     if (this.props.logged_in === null) {
//       this.props.isLoggedIn()
//     }
//   }


//   render () {
//     if (this.state.isLoading === true ) {
//       return <div>Loading ...........</div>
//     } else if (this.props.loading_user === true ){
//       return (
//         <div>Loading ...........</div>
//         )
//     } else if (this.state.restaurant_name === null ){
//       return (
//         <div>
//           <h1>{this.state.error_msg}</h1>
//           <Link to={`/c/code`} >
//             <div className="btn btn-secondary">Entrer le code manuellement</div>
//           </Link>
//         </div>
//       )
//     } else if (this.state.restaurant_name != null && this.props.logged_in) {
//       return (
//       <div>
//         <h1>Bravo !</h1>
//         <h2>Pour gagner un point chez {this.state.restaurant_name}, continue !</h2>
//         <ActivateStarcodeForm {...this.props} togglePopup={this.togglePopup} />
//         {this.state.showPopup &&
//           <Popup
//             text='Code validé !'
//             starsGained = {this.props.stars_gained}
//             closePopup={this.closePopup}
//           />
//         }
//     </div>
//       )
//     } else if (this.state.restaurant_name != null && this.props.logged_in===false && this.state.signIn_option === true) {
//      return (
//         <div>
//           <h1>Bravo !</h1>
//           <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
//           <SignInAndActivateStarcodeForm {...this.props} togglePopup={this.togglePopup} />
//           {this.state.signIn && (<p>{this.state.signIn}</p>) }
//           <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
//             {this.state.signIn_option ? <p>Créer un compte</p> : <p>J'ai déjà un compte</p>}
//           </div>
//         </div>
//       )
//     } else if (this.state.restaurant_name != null && this.props.logged_in===false && this.state.signIn_option === false) {
//      return (
//         <div>
//           <h1>Bravo !</h1>
//           <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
//           <SignUp {...this.props} togglePopup={this.togglePopup} />
//           {this.state.signIn && (<p>{this.state.signIn}</p>) }
//           <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
//             {this.state.signIn_option ? <p>Créer un compte</p> : <p>J'ai déjà un compte</p>}
//           </div>
//         </div>
//       )
//     // <div>

//     //   <h1>Bravo !</h1>
//     //   <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
//     //   <Formik
//     //     initialValues={{
//     //       code: this.props.match.params.code,
//     //       email: '',
//     //       password: ''
//     //     }}
//     //     enableReinitialize={true}
//     //     validationSchema={Yup.object({
//     //       code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
//     //       email: Yup.string().email('Invalid email address').required('required'),
//     //       password: Yup.string().required('required'),
//     //     })}
//     //     onSubmit={(values,actions) => {
//     //       this.signIn(values,actions)
//     //     }}
//     //     >
//     //     {({values,
//     //        errors,
//     //        touched,
//     //        handleChange,
//     //        handleBlur,
//     //        handleSubmit,
//     //        isSubmitting}) => (
//     //        <Form>
//     //           <Field type="text" name="code" readOnly className="d-none"/>
//     //           <Field type="email" name="email" placeholder="email" />
//     //           <ErrorMessage name="email" component="div" />
//     //           <Field type="password" name="password" placeholder="mot de passe" />
//     //           <ErrorMessage name="password" component="div" />
//     //           <button type="submit" disabled={isSubmitting} >
//     //            Submit
//     //           </button>
//     //           {this.props.error_user && (<p>Identifiants incorrects</p>)}
//     //           {this.props.error_starcode && (<p>une erreur s'est produite, réessayez plus tard</p>)}
//     //           {this.state.signIn && (
//     //               <p className="">
//     //                 {this.state.signIn}
//     //               </p>
//     //             )}
//     //           {this.state.showPopup ?
//     //             <Popup
//     //               text='Code validé ! Tu as gagné un point :)'
//     //               closePopup={this.togglePopup.bind(this)}
//     //               starsGained ={this.props.stars_gained}
//     //             />
//     //             : null
//     //           }
//     //       </Form>
//     //     )}
//     //   </Formik>
//     //   <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
//     //       {this.state.signIn_option ?
//     //         <p>Créer un compte</p>
//     //         : <p>J'ai déjà un compte</p>
//     //       }
//     //   </div>
//     // </div>)}
//     // else if (this.state.restaurant_name != null && this.props.logged_in==false && this.state.signIn_option == false) {
//     //   return (

//     //     <div>
//     //       <h1>Bravo !</h1>
//     //       <h2>Pour gagner un point chez {this.state.restaurant_name}, connecte toi ou inscris toi !</h2>
//     //       <Formik
//     //         initialValues={{
//     //           code: this.props.match.params.code,
//     //           email: '',
//     //           password: '',
//     //           password_confirmation:''
//     //         }}
//     //         enableReinitialize={true}
//     //         validationSchema={Yup.object({
//     //           code: Yup.string().length(6, 'Ne contient pas 6 charactères').required('required'),
//     //           email: Yup.string().email('Invalid email address').required('required'),
//     //           password: Yup.string().required('Password is required').min(6, "Doit contenir 6 charactères minimum"),
//     //           password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
//     //         })}
//     //         onSubmit={(values,actions) => {
//     //           this.signUp(values,actions)
//     //         }}
//     //         >
//     //         {({values,
//     //            errors,
//     //            touched,
//     //            handleChange,
//     //            handleBlur,
//     //            handleSubmit,
//     //            isSubmitting}) => (
//     //            <Form>
//     //               <Field type="text" name="code" readOnly className="d-none"/>
//     //               <Field type="email" name="email" placeholder="email" />
//     //               <ErrorMessage name="email" component="div" />
//     //               <Field type="password" name="password" placeholder="mot de passe" />
//     //               <ErrorMessage name="password" component="div" />
//     //               <Field type="password" name="password_confirmation" placeholder="confirmer mot de passe" />
//     //               <ErrorMessage name="password_confirmation" component="div" />
//     //               <button type="submit" disabled={isSubmitting} >
//     //                Submit
//     //               </button>
//     //               {this.state.signUp && (
//     //                   <p className="">
//     //                     {this.state.signUp}
//     //                   </p>
//     //                 )}
//                   // {this.state.showPopup ?
//                   //   <Popup
//                   //     text='Compte créé et Code validé ! Tu as gagné un point :)'
//                   //     closePopup={this.togglePopup.bind(this)}
//                   //   />
//                   //   : null
//                   // }
//     //           </Form>
//     //         )}
//     //       </Formik>

//     //       <div onClick={() => {this.setState({signIn_option: !this.state.signIn_option})}}>
//     //           {this.state.signIn_option ?
//     //             <p>Créer un compte</p>
//     //             : <p>J'ai déjà un compte</p>
//     //           }
//     //       </div>
//     //     </div>

//      // )}
//   ;}
// }


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ isLoggedIn ,logIn, activateStarcode, logInAndActivateStarcode }, dispatch)
// }


// function mapStateToProps(state, ownProps) {
//   let error_starcode = null
//   let loading_starcode = false
//   let stars_gained = null

//   if (state.data.error_starcode) {
//     error_starcode = state.data.error_starcode
//   }

//   if (state.data.loading_starcode) {
//     loading_starcode = state.data.loading_starcode
//   }

//   if (state.data.stars_gained) {
//     stars_gained = state.data.stars_gained
//   }


//   let logged_in = null
//   let error_user = null
//   let loading_user = false
//   if (state.logged_in) {
//     logged_in = state.logged_in.logged_in
//     loading_user = state.logged_in.loading_user;
//     error_user = state.logged_in.error
//   }
//   return { logged_in, loading_user, error_user, error_starcode, loading_starcode, stars_gained }
// }



// export default withRouter(connect(mapStateToProps, mapDispatchToProps )(StarsValidation));


