import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import build, { fetchFromMeta } from 'redux-object';
import Restaurant from '../components/restaurant';
import { apicall } from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};



class RestaurantsIndex extends Component  {
  constructor(props){
    super(props);
// { loading = false, dispatch, restaurants }
  }


  componentDidMount() {
    console.log('yoloooo')
    this.props.dispatch(apicall('api/v1/restaurants'));
  }

  render() {
    const qWidgets = this.props.restaurants.map(q => <Restaurant key={q.id} restaurant={q} />);
    return (
      <div>
        {qWidgets}
      </div>
    );
  }
}

RestaurantsIndex.propTypes = propTypes;

function mapStateToProps(state) {
  console.log(state)
  // console.log(state.data.meta['api/v1/restaurants'])
  if (state.data.meta['api/v1/restaurants']) {
    const restaurants = (state.data.meta['api/v1/restaurants'].data || []).map(object => build(state.data, 'restaurant', object.id));
    const loading = state.data.meta['api/v1/restaurants'].loading;

    return { restaurants, loading };
  }

  return { restaurants: [] };
}

export default withRouter(connect(mapStateToProps)(RestaurantsIndex));
