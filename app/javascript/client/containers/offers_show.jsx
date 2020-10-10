import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import CodeForm from './code_form';
import { fetchOffer } from '../actions';


class OffersShow extends Component {



  componentDidMount() {
    // if (!this.props.offer) {
      this.props.fetchOffer(this.props.match.params.restaurant_id,this.props.match.params.id);
    // }
  }

  handleClick = () => {
    return <Redirect to={`restaurants/${this.props.restaurant.id}`} />
  }


  render () {

      return (
        [
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>Solde : 8 <i className="fas fa-star"></i></p>
            </div>
            <p className="card-restaurant-pricing">3 offres disponibles</p>
          </div>
        </div>
      ,
            <div className="card-offer-show">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offers[0].title}</h2>
                <h2>{this.props.offers[0].stars_required} <i className="fas fa-star"></i></h2>
              </div>


              <CodeForm offer_id={this.props.offers[0].id} />
              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/restaurants/${this.props.restaurant.id}`}>
                  <button type="button" className="btn btn-secondary" >Retour</button>
                </Link>
              </div>
            </div>
              ]);
            }
            ;
}




function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id, 10);
  const restaurant_id = parseInt(ownProps.match.params.restaurant_id, 10);
  let offer = state.offers.find((offer) => offer.id === id);
  if (!offer) {
    offer = {}
  }

  return {
    restaurant: state.restaurants.find((restaurant) => restaurant.id === restaurant_id),
    offers: [offer],
    code: state.code
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOffer }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffersShow));
