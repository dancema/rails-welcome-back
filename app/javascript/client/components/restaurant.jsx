import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';



const propTypes = {
  restaurant: PropTypes.object.isRequired,
};



function Restaurant({ restaurant }) {
  return (
    <Link to={`/c/restaurants/${restaurant.id}`} key={restaurant.id} >
      <div className="card-restaurant" >
        <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
        <div className="card-restaurant-infos">
          <div>
            <h2>{restaurant.name}</h2>
            <p>Solde : {restaurant.countStars} <i className="fas fa-star"></i></p>
          </div>
        </div>
      </div>
    </Link>
  );
}


Restaurant.propTypes = propTypes;

export default Restaurant;
