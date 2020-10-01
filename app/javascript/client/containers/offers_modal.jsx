import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Navbar from '../components/navbar';

import {  } from '../actions';

// import Aside from '../components/aside';

class OffersModal extends Component {

  static defaultProps ={ id: 1, title: 'Bière Mythos', stars_required: 2, available: true, code: 'XXXX-XXXX' }

  render () {
              return (
                <div
                  role="button"
                  className="modal-wrapper"
                  onClick={() => this.props.history.goBack()}
                >
                  <div
                    role="button"
                    className="modal"
                    onClick={e => e.stopPropagation()}
                  >
                    <p>
                      CONTENT
                    </p>
                  </div>
                </div>
);
};
}

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  return {
    restaurant: state.restaurants.find((restaurant) => restaurant.id === id)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffersModal));
