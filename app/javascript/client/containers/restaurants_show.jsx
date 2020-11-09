import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CodeForm from './code_form';
import OffersShow from './offers_show';

import { fetchRestaurant, fetchOffers, fetchStar, fetchNbOffersAvailable } from '../actions';

// import Aside from '../components/aside';

class RestaurantsShow extends Component {


  componentDidMount() {
    if (!this.props.restaurant) {
      this.props.fetchRestaurant(this.props.match.params.id);
    }
    if (!this.props.star) {
      this.props.fetchStar(this.props.match.params.id);
    }
    this.props.fetchOffers(this.props.match.params.id);
  }



  render () {


    return [
      <div className="card-restaurant no-shadow" >
        <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
        <div className="card-restaurant-infos">
          <div>
            <h2>{this.props.restaurant.name}</h2>
            <p>Solde : {this.props.star || 0} <i className="fas fa-star"></i></p>
          </div>
        </div>
      </div>,
      <div className="container">
        <h2>Mes offres</h2>
        <div className="row">
          {this.props.offers.map((offer) => {
            let classOfferAvailable = "inactive "
            if ((this.props.star || 0) >= offer.stars_required) {
              classOfferAvailable += "d-none"
            }

              return (

              <div className="col-6 col-sm-4 ">
                <Link to={`${this.props.restaurant.id}/offers/${offer.id}`} className="link">
                  <div className={classOfferAvailable}>
                    <i className="fas fa-lock" />
                  </div>
                  <div className="">
                      <div key={offer.id} className="card-offer" >
                        <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                        <h2>{offer.title}</h2>
                        <div className="card-offer-stars-required">
                          {offer.stars_required} <i className="fas fa-star"></i>
                        </div>
                        </div>
                  </div>
                </Link>
              </div>
            );
            }
          )}
        </div>
        <h2>Informations sur le restaurant</h2>
        <ul className="order-option d-flex">
          <li>A emporter</li>
          <li>Uber Eats</li>
          <li>Deliveroo</li>
        </ul>

        <div className="menu">
          <img src="https://www.iconfinder.com/data/icons/delivery-man-1/246/deliveryman-003-512.png" alt="" />
          <div className="text-center">
            <h2>Livraison par le restaurant :</h2>
            <h2>06 63 61 32 95</h2>
          </div>
        </div>

        <div className="menu">
          <img src="https://i.pinimg.com/originals/34/6a/1f/346a1f4363e1b59f6860fdce6abc1082.jpg" alt="" />
          <h2>Consulter le menu</h2>
        </div>


        <div className="menu">
          <img src="https://cdn.vox-cdn.com/thumbor/pOMbzDvdEWS8NIeUuhxp23wi_cU=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png" alt="" />
          <h2>Adresse</h2>
        </div>


        <p className="mt-3 text-center">Pour chaque commande passée, vous trouverez dans le sac un QR code donnant 1 étoile <i className="fas fa-star"></i></p>
        <p className="mt-3 text-center">Si vous utilisez une offre, vous ne recevrez pas d’étoile pour votre commande</p>
      </div>
      ];
  }
};

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  return {
    restaurant: state.restaurants.find((restaurant) => restaurant.id === id),
    offers: state.offers,
    star: state.stars[id],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurant, fetchOffers, fetchStar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantsShow));
