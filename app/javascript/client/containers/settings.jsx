import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Settings extends Component {

  render () {

    return (
      <div></div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
