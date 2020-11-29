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
      disable: null
    }
  }



  componentDidMount() {

    this.props.dispatch(apicall(`/api/v1/offers/${this.props.match.params.id}`))
      .then(this.props.dispatch(isLoggedIn()));



    // if (this.props.loading === false) {
    //   this.props.dispatch(isLoggedIn())
    // }

    // this.props.fetchStar(this.props.match.params.restaurant_id);
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
    console.log(data)
    axios.post('/api/v1/offercodes', data
    )
    .then((response) => {
      console.log(response)
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
    const loading_user_status = this.props.loading_user
    const loading_data = this.props.loading

    if ((loading_user_status === false) && (loading_data===false)) {

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
  // console.log(state)

  let loading_user = true
  let logged_in = {}
  if (state.logged_in) {
    loading_user = state.logged_in.loading_user
    logged_in = state.logged_in.logged_in
  }

  const id = parseInt(ownProps.match.params.id);
  const metaName = Object.keys(state.data.meta)[0]

  let offer = {}
  let loading = true
  if (state.data.meta[metaName]) {
    offer = build(state.data, 'offer', id);
    loading = state.data.meta[metaName].loading;
  }

  return { loading_user: loading_user, loading: loading, offer: offer, logged_in }

  // return { restaurant: {}, offer: {} };
}

export default withRouter(connect(mapStateToProps)(OffersShow));
