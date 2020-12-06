import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import build  from 'redux-object';
import Restaurant from '../components/restaurant';
import { apicall, isLoggedIn } from '../actions';

const RestaurantsIndex = ({ restaurants, logged_in, loading_user, loading, dispatch }) => {

  useEffect(() =>  {
   (restaurants.length === 0) && dispatch(apicall('api/v1/restaurants'));
   (logged_in === null) && dispatch(isLoggedIn());
  }, [])

  return (
    <>
      {(loading_user || loading) && <div>Loading ...</div>}
      {(!loading_user && !loading) && restaurants.map(q => <Restaurant key={q.id} restaurant={q}/>)}
    </>
  )
}

RestaurantsIndex.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  let restaurants = []
  let loading = false
  let loading_user = false
  if (state.data.meta['api/v1/restaurants']) {
    restaurants = (state.data.meta['api/v1/restaurants'].data || []).map(object => build(state.data, 'restaurant', object.id));
    loading = state.data.meta['api/v1/restaurants'].loading;
  }

  let logged_in = null
  if (state.logged_in) {
    logged_in = state.logged_in.logged_in
    loading_user = state.logged_in.loading_user;
  }

  return { restaurants, loading, loading_user, logged_in};
}

export default withRouter(connect(mapStateToProps)(RestaurantsIndex));
