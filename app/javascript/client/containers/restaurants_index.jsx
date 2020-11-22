import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { fetchRestaurants, fetchStars, isLoggedIn } from '../actions/index';


class RestaurantsIndex extends Component {
  componentDidMount() {
    if (!this.props.restaurants){
      this.props.fetchRestaurants();
    }

    if (!this.props.logged_in) {
      this.props.isLoggedIn()
    }

    if (this.props.logged_in === true) {
      this.props.fetchStars();
    }
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
                </div>
              </div>
            </Link>
          );
        })}
      </div>,
      <div className="container text-center">
        <Link to="/c/stars" >
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
    logged_in: state.logged_in
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurants, fetchStars, isLoggedIn }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantsIndex));
