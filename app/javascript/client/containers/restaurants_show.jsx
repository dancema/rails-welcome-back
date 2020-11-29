import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from 'react-bootstrap-button-loader';
import { Link, withRouter } from 'react-router-dom';

import build, { fetchFromMeta } from 'redux-object';
import Offer from '../components/offer';
import { apicall, isLoggedIn } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};



class RestaurantsShow extends Component  {
  constructor(props){
    super(props);
  }


  componentDidMount() {
    // if (this.props.logged_in === null) {
    //   this.props.dispatch(isLoggedIn())
    // }


    if (Object.keys(this.props.restaurant).length === 0) {
      this.props.dispatch(apicall(`/api/v1/restaurants/${this.props.match.params.id}`));
    }
  }

  render() {
    const qWidgets = this.props.offers.map(q => <Offer key={q.id} offer={q} />);
    return (
      <div>
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>Solde : {this.props.restaurant.countStars} <i className="fas fa-star"></i></p>
            </div>
          </div>
        </div>
        <div>
          {qWidgets}
        </div>
      </div>
    );
  }
}

RestaurantsShow.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);

  const restaurant = build(state.data, 'restaurant', id);

  if (restaurant) {
    const offers = restaurant.offers;
    return { restaurant, offers };
  }

  const metaName = Object.keys(state.data.meta)[0]
  if (state.data.meta[metaName]) {
    const restaurant = build(state.data, 'restaurant', id);
    const offers = restaurant.offers;
    const loading = state.data.meta[metaName].loading;

    return { restaurant, loading, offers };
  }

  return { restaurant: {}, offers: [], logged_in: null };
}

export default withRouter(connect(mapStateToProps)(RestaurantsShow));
