import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import CodeForm from './code_form';
import { fetchOffer, fetchStar } from '../actions';


class OffersShow extends Component {



  componentDidMount() {
    // if (this.props.offer === []) {
      this.props.fetchOffer(this.props.match.params.restaurant_id,this.props.match.params.id);
    // }
    this.props.fetchStar(this.props.match.params.restaurant_id);

  }


  render () {

      return (
        [
        <div className="card-restaurant no-shadow" >
          <img src="https://raw.githubusercontent.com/lewagon/fullstack-images/master/uikit/greece.jpg" />
          <div className="card-restaurant-infos">
            <div>
              <h2>{this.props.restaurant.name}</h2>
              <p>Solde : {this.props.star || 0} <i className="fas fa-star"></i></p>
            </div>
          </div>
        </div>
      ,
            <div className="card-offer-show">
              <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
              <div className="d-flex justify-content-between p-2">
                <h2>{this.props.offer.title}</h2>
                <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
              </div>


              <CodeForm offer_id={this.props.offer.id} disabled={this.props.star < this.props.offer.stars_required} />
              <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
              <div className="modal-footer">
                <Link to={`/c/restaurants/${this.props.restaurant.id}`}>
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

  return {
    restaurant: state.restaurants.find((restaurant) => restaurant.id === restaurant_id),
    offer: state.offers.find((offer) => offer.id === id) || [],
    star: state.stars[restaurant_id],
    offercode: state.offercode,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchOffer, fetchStar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OffersShow));
