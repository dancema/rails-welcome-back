import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CodeForm from './code_form';
import { fetchOffer } from '../actions';


class OffersShow extends Component {
  constructor(props){
    super(props),
    this.state = {
    }
  }


  componentDidMount() {
    if (!this.props.offer) {
      this.props.fetchOffer(this.props.match.params.restaurant_id,this.props.match.params.id);
    }
  }


  render () {
      return (
        [,
            <div className="">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offer.title}</h2>
                <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
              </div>
              <CodeForm offer_id={this.props.offer.id} />
              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Retour</button>
              </div>
            </div>
              ]);
            }
            ;
}





function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10);
  return {
    offer: state.offers.find((offer) => offer.id === id),
    code: state.code
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOffer }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffersShow));
