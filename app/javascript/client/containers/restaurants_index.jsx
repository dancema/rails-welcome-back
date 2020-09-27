import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchRestaurants } from '../actions';

import Navbar from '../components/navbar';

class RestaurantsIndex extends Component {
  // componentWillMount() {
  //   this.props.fetchCars(this.props.garage);
  // }

  render () {
    // if (this.props.cars.length === 0) {
    //   return [
    //     <Aside key="aside" garage={this.props.garage}>
    //       <Link to="/cars/new">Add a car</Link>
    //     </Aside>,
    //     <div className="no-car" key="nocar">No car yet</div>
    //   ];
    // }
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
                    <p>Solde : 8 <i class="fas fa-star"></i></p>
                  </div>
                  <p className="card-restauant-pricing">3 offres disponibles</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>,
      <div className="container text-center">
        <button className="scan-qr">Scanner QR Code</button>
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
