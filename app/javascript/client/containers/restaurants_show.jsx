import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Navbar from '../components/navbar';

import { fetchOffers, fetchCode } from '../actions';

// import Aside from '../components/aside';

class RestaurantsShow extends Component {
  static defaultProps = {
    offers: [
      { id: 1, title: 'Bière Mythos', stars_required: 2, available: true, code: 'XXXX-XXXX' },
      { id: 2, title: "Frites maison à l'origan", stars_required: 3, available: true, code: 'XXXX-XXXX' },
      { id: 3, title: 'Souvlaki de poulet citronné', stars_required: 5, available: true, code: 'XXXX-XXXX' },
      { id: 4, title: "Gyros ap'ola", stars_required: 6, available: false, code: 'XXXX-XXXX' },
      { id: 5, title: 'Souvlaki de poulet citronné + Boisson + Dessert', stars_required: 9, available: false, code: 'XXXX-XXXX' },
      { id: 6, title: '2 Gyros + 2 Boissons + 2 Desserts', stars_required: 12, available: false, code: 'XXXX-XXXX' }
    ],
    code: 'XXXX-XXXX'
  };


  render () {

    return [
      <div className="card-restaurant no-shadow" >
        <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
        <div className="card-restaurant-infos">
          <div>
            <h2>{this.props.restaurant.name}</h2>
            <p>Solde : 8 <i className="fas fa-star"></i></p>
          </div>
          <p className="card-restaurant-pricing">3 offres disponibles</p>
        </div>
      </div>,
      <div className="container">
        <h2>Mes offres</h2>
        <div className="row">
          {this.props.offers.map((offer) => {
            if (offer.available === false) {
              return (
                <div className="col-6 col-sm-4">
                  <div className="inactive">
                    <i className="fas fa-lock" />
                  </div>
                  <div key={offer.id} className="card-offer" >
                    <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                    <div className="card-offers-infos">
                      <h2>{offer.title}</h2>
                    </div>
                    <div className="card-offer-stars-required">{offer.stars_required} <i className="fas fa-star"></i></div>
                  </div>
                </div>);
            } else {
              return [
                <div className="col-6 col-sm-4">
                  <div key={offer.id} className="card-offer" data-toggle="modal" data-target={`#ModalCenter${offer.id}`} >
                    <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                    <h2>{offer.title}</h2>
                    <div className="card-offer-stars-required">
                      {offer.stars_required} <i className="fas fa-star"></i>
                    </div>
                    </div>
                </div>,
                <div>
                  <div className="modal fade" id={`ModalCenter${offer.id}`} tabIndex="-1" role="dialog" aria-labelledby={"ModalCenter" + offer.id + "Title"} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                          <div className="d-flex justify-content-between p-2">
                            <h2>{offer.title}</h2>
                            <h2>{offer.stars_required} <i className="fas fa-star"></i></h2>
                          </div>
                          <button className='btn btn-secondary'>Activer offre</button>
                          Code : {offer.code}
                          <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Retour</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>];
            }
          })}
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOffers }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantsShow));
