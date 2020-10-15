import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchRestaurants, fetchStars, fetchNbOffersAvailable } from '../actions/index';


class RestaurantsIndex extends Component {
  componentDidMount() {
    if (!this.props.restaurants){
      this.props.fetchRestaurants();
    }
    this.props.fetchStars();
    this.props.fetchNbOffersAvailable();
  }

  render () {

    return [
      <div className="container">
        <h2>Mes Restaurants</h2>
        {this.props.restaurants.map((restaurant) => {
          return (
            <Link to={`/c/restaurants/${restaurant.id}`} key={restaurant.id} >
              <div key={restaurant.id}  className="card-restaurant" >
                <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
                <div className="card-restaurant-infos">
                  <div>
                    <h2>{restaurant.name}</h2>
                    <p>Solde : {this.props.stars[restaurant.id] || 0 } <i className="fas fa-star"></i></p>
                  </div>
                  <p className="card-restauant-pricing">Offres disponibles : {this.props.nb_offers_available[restaurant.id] || 0 }</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>,
      <div className="container text-center">
        <Link to="c/stars" >
          <button className="scan-qr">Entrer code</button>
        </Link>
        <p>Pour chaque commande passée auprès des restaurants partenaires, vous trouverez dans le sac un QR code donnant 1 étoile</p>
      </div>];
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants,
    stars: state.stars,
    nb_offers_available: state.nb_offers_available
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurants, fetchStars, fetchNbOffersAvailable }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantsIndex));
