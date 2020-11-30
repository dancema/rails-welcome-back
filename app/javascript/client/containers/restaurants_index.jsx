import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import build, { fetchFromMeta } from 'redux-object';
import Restaurant from '../components/restaurant';
import { apicall, isLoggedIn } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};



class RestaurantsIndex extends Component  {
  constructor(props){
    super(props);
  }


  componentDidMount() {
    if (this.props.restaurants.length === 0) {
      this.props.dispatch(apicall('api/v1/restaurants'));
    }

    if (this.props.logged_in === null) {
      this.props.dispatch(isLoggedIn())
    }
  }

  render() {

    const qWidgets = this.props.restaurants.map(q => <Restaurant key={q.id} restaurant={q} />);

    if ((this.props.loading_user === false)  && (this.props.loading===false)) {
      return (
        <div>
          {qWidgets}
        </div>
        );
    } else {
      return(<div>Loading ...</div>)
    }
  }
}

RestaurantsIndex.propTypes = propTypes;

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
