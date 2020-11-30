import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import build, { fetchFromMeta } from 'redux-object';

import { apicall, isLoggedIn } from '../actions';

class OffersShow extends Component {
  constructor(){
    super()
    this.state = {
      offercode: null,
    }
  }



  componentDidMount() {

    if (Object.keys(this.props.offer).length === 0) {
      this.props.dispatch(apicall(`/api/v1/offers/${this.props.match.params.id}`))
    }

    if (this.props.logged_in === null) {
      this.props.dispatch(isLoggedIn());
    }

  }


  disable = () => {
      if (!this.props.logged_in) {
        return true
      } else if (this.props.offer.restaurant.countStars < this.props.offer.starsRequired) {
        return true
      } else {
        return false
      }
  }


  optionalMessage = () => {
    if (this.props.offer.restaurant.countStars < this.props.offer.starsRequired) {
        return (
          <div>Tu n as pas assez de points pour activer l'offre</div>
          )
    } else if (!this.props.logged_in) {
      return (
          <div className ='btn btn-secondary'>
              <a href="/sign_up">Creer un compte pour en profiter !</a>
          </div>
        )
    }
  }


  createCode = (values, actions) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.withCredentials = true
    axios.defaults.headers.post['Accept'] = 'application/json';


    let data = JSON.stringify({offer :{id: values.id}})
    axios.post('/api/v1/offercodes', data
    )
    .then((response) => {
      this.setState({offercode: {code: response.data.code}});

    })
    .catch((error) => {
      if (error.response) {
        actions.setSubmitting(false);
        this.setState({});
      }
    });
  }


  render () {

    if ((Object.keys(this.props.offer).length != 0) && (this.props.loading_user === false)  && (this.props.loading===false)) {

      return (
        <div>
          <div className="card-restaurant no-shadow" >
            <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
            <div className="card-restaurant-infos">
              <div>
                <h2>{this.props.offer.restaurant.name}</h2>
                <p> <i className="fas fa-star"></i></p>
              </div>
            </div>
          </div>

          <div className="card-offer-show">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offer.title}</h2>
                <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
              </div>


              <Formik
                initialValues={{
                  id: this.props.offer.id,
                }}
                enableReinitialize={true}
                validationSchema={Yup.object({
                  id: Yup.string().matches(/^\d+$/,'')
                })}
                onSubmit={(values,actions) => {
                  this.createCode(values,actions)
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
                      <Field type="text" name="id" readOnly className="d-none"/>
                      <button type="submit" disabled={isSubmitting || this.disable()} >

                        {this.state.offercode ?
                          this.state.offercode.code
                          : 'Valider'
                        }
                      </button>
                  </Form>
                )}
              </Formik>

              {this.optionalMessage()}

              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/c/restaurants/${this.props.offer.restaurant.id}`}>
                  <button type="button" className="btn btn-secondary" >Retour</button>
                </Link>
              </div>
            </div>


        </div>
      )
    } else {
      return (
        <div>Loading ...</div>
      )
    }
  }
}




function mapStateToProps(state, ownProps) {

  const id = parseInt(ownProps.match.params.id);
  let restaurant = {}
  let offer = {}
  let loading = false
  let loading_user = false
  const metaName = Object.keys(state.data.meta)[0]

  if (state.data.meta[metaName]) {
    if (build(state.data, 'offer', id)){
      offer = build(state.data, 'offer', id)
      restaurant = offer.restaurant;
    }
    loading = state.data.meta[metaName].loading;
  }


  let logged_in = null
  if (state.logged_in) {
    logged_in = state.logged_in.logged_in
    loading_user = state.logged_in.loading_user;
  }

  return { restaurant, offer, logged_in, loading, loading_user };
}

export default withRouter(connect(mapStateToProps)(OffersShow));
