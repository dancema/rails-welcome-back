import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';



const propTypes = {
  offer: PropTypes.object.isRequired,
};



function Offer({ offer }) {
  return (
      <div className="col-6 col-sm-4 ">
        <Link to={`/c/offers/${offer.id}`} >
              <div className="card-offer" >
                <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                <h2>{offer.title}</h2>
                <div className="card-offer-stars-required">
                  {offer.stars_required} <i className="fas fa-star"></i>
                </div>
              </div>
        </Link>
      </div>
  );
}


Offer.propTypes = propTypes;

export default Offer;
