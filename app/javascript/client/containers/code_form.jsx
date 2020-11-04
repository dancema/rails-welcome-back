import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createCode, cancelCode } from '../actions/index';
import { reduxForm, Field } from 'redux-form';



class CodeForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: false
    }
  }



  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({disabled: true});
    this.props.createCode(this.props.offer_id);
  }

  textButtonActivation = () => {
    if (this.props.disabled === false) {
      return "Activer offre"
    } else {
      return "Offre indisponible"
    }
  }


  componentWillUnmount() {
    this.props.cancelCode()
  }

  render() {
    return (
      [
      <form onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
        <input readOnly value={this.props.offer_id} className='d-none' />
        <button type="submit" disabled={this.props.disabled} className='btn btn-secondary'>{this.textButtonActivation()}</button>
        <h2 className="mt-2">{this.props.offercode.code}</h2>
      </form>
    ]);
  }
}

function mapStateToProps(state) {
  return {
    offercode: state.offercode
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createCode, cancelCode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeForm);
