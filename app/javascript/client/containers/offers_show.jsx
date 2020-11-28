import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { fetchOffer, fetchStar, isLoggedIn } from '../actions';

import React, { useState, Component, PureComponent } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


class OffersShow extends Component {
  constructor(){
    super()
    this.state = {
      offercode: null
    }
  }



  componentDidMount() {
    // if (this.props.offer === []) {
      this.props.fetchOffer(this.props.match.params.id);
    // }

    // if (!this.props.logged_in) {
    //   this.props.isLoggedIn()
    // }

    // this.props.fetchStar(this.props.match.params.restaurant_id);
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
      if (this.props.logged_in === null)
        return (<div>Loading....</div>)
      else if (this.props.logged_in === false)
        return (
        [
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>Pas connecte <i className="fas fa-star"></i></p>
            </div>
          </div>
        </div>
      ,
            <div className="card-offer-show">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offer.title}</h2>
                <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
              </div>

              <div className ='btn btn-secondary'>
                <a href="/sign_up">Creer un compte pour en profiter !</a>
              </div>

              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/c/restaurants/${this.props.restaurant.id}`}>
                  <button type="button" className="btn btn-secondary" >Retour</button>
                </Link>
              </div>
            </div>
              ]
        )
      else if (this.props.star === undefined)
        return (<div>Loading....</div>)
      else if (this.props.star < this.props.offer.stars_required)
        return (
        [
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>{this.props.star || 0}  <i className="fas fa-star"></i></p>
            </div>
          </div>
        </div>
      ,
            <div className="card-offer-show">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offer.title}</h2>
                <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
              </div>


              <div className ='btn btn-secondary'>
                Non disponible
              </div>

              <p>Tu n as pas assez de points pour activer l'offre</p>

              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/c/restaurants/${this.props.restaurant.id}`}>
                  <button type="button" className="btn btn-secondary" >Retour</button>
                </Link>
              </div>
            </div>
              ]
        )

      else if (this.props.star >= this.props.offer.stars_required)
      return (
        [
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>Solde : {this.props.star || 0} <i className="fas fa-star"></i></p>
            </div>
          </div>
        </div>
      ,
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
                      <button type="submit" disabled={isSubmitting} >

                        {this.state.offercode ?
                          this.state.offercode.code
                          : 'Valider'
                        }
                      </button>
                  </Form>
                )}
              </Formik>


              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/c/restaurants/${this.props.restaurant.id}`}>
                  <button type="button" className="btn btn-secondary" >Retour</button>
                </Link>
              </div>
            </div>
              ]);
            }
            ;
}




function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10);
  const restaurant_id = parseInt(ownProps.match.params.restaurant_id, 10);

  return {
    restaurant: state.restaurants.find((restaurant) => restaurant.id === restaurant_id),
    offer: state.offers.find((offer) => offer.id === id) || [],
    star: state.stars[restaurant_id],
    logged_in: state.logged_in
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOffer, fetchStar, isLoggedIn }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffersShow));
