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
    console.log(this.props)
    if (Object.keys(this.props.restaurant).length === 0) {
      this.props.dispatch(apicall(`/api/v1/restaurants/${this.props.match.params.id}`));
    }

    if (this.props.logged_in === null) {
      this.props.dispatch(isLoggedIn())
    }
  }

  render() {

    const qWidgets = this.props.offers.map(q => <Offer key={q.id} offer={q} />);
    if ((Object.keys(this.props.restaurant).length != 0) && (this.props.loading_user === false)  && (this.props.loading===false)) {
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
    } else {
      return(<div>Loading ....</div>)
    }
  }
}

RestaurantsShow.propTypes = propTypes;

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);

  let restaurant = {}
  let offers = []
  let loading = false
  let loading_user = false
  const metaNames = Object.keys(state.data.meta)
  const urlNameShowRestaurant = `/api/v1/restaurants/${id}`
  const urlNameIndexRestaurant = 'api/v1/restaurants'

  if (metaNames.includes(urlNameIndexRestaurant) || metaNames.includes(urlNameShowRestaurant)) {

    if (build(state.data, 'restaurant', id)) {
      restaurant = build(state.data, 'restaurant', id)
      offers = restaurant.offers
    }

    loading = state.data.meta[metaNames[0]].loading;
  }

  let logged_in = null
  if (state.logged_in) {
    logged_in = state.logged_in.logged_in
    loading_user = state.logged_in.loading_user;
  }


  return { restaurant,offers, logged_in, loading, loading_user };

}

export default withRouter(connect(mapStateToProps)(RestaurantsShow));
