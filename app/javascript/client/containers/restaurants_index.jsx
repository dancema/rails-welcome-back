import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRestaurants } from '../actions/index';

import Navbar from '../components/navbar';

class RestaurantsIndex extends Component {
  componentDidMount() {
    this.props.fetchRestaurants();
  }

  render () {

    return [
      <div className="container" key="cars">
        <h2>Mes Restaurants</h2>
        {this.props.restaurants.map((restaurant) => {
          return (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} >
              <div key={restaurant.id}  className="card-restaurant" >
                <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
                <div className="card-restaurant-infos">
                  <div>
                    <h2>{restaurant.name}</h2>
                    <p>Solde : 8 <i className="fas fa-star"></i></p>
                  </div>
                  <p className="card-restauant-pricing">3 offres disponibles</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>,
      <div className="container text-center">
        <Link to="/stars" >
          <button className="scan-qr">Scanner QR Code</button>
        </Link>
        <p>Pour chaque commande passée auprès des restaurants partenaires, vous trouverez dans le sac un QR code donnant 1 étoile</p>
      </div>];
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurants }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsIndex);
