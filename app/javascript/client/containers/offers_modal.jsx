import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CodeForm from './code_form';
import $ from 'jquery';


// import Aside from '../components/aside';

class OffersModal extends Component {



    // $("#ModalCenter1").on("hidden.bs.modal", function () {
    //   console.log("hello")
    // });


  render () {
      return (
               <div className="modal fade" id={`ModalCenter${this.props.offer.id}`} tabIndex="-1" role="dialog" aria-labelledby={"ModalCenter" + this.props.offer.id + "Title"} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="card-offer-img" style={{backgroundImage: 'url(https://picky-palate.com/wp-content/uploads/2020/04/IMG_7790-scaled-e1588014500955.jpg)'}} />
                          <div className="d-flex justify-content-between p-2">
                            <h2>{this.props.offer.title}</h2>
                            <h2>{this.props.offer.stars_required} <i className="fas fa-star"></i></h2>
                          </div>
                          <CodeForm offer_id={this.props.offer.id} />
                          <p>Offre valable uniquement à emporter/livré à domicile par le restaurant. Code à communiquer au restaurant</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Retour</button>
                        </div>
                      </div>
                    </div>
                  </div>
              );
            };
}

function mapStateToProps(state, ownProps) {
  return {
    code: state.code
  };
}


export default withRouter(connect(mapStateToProps, null)(OffersModal));
