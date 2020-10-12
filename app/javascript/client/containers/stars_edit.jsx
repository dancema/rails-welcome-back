import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { editStar } from '../actions';



class StarsEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: this.props.match.params.code
    }
  }

  componentDidMount() {
    this.messageBox.focus();
  }

  handleChange = (event) => {
    this.setState({value: event.target.value })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.editStar(this.state.value);
    this.setState({value: ""});
  }


  render() {
    return (

      <div className="container">
        <form onSubmit={this.handleSubmit} className="channel-editor">
          <input
            ref={input => this.messageBox = input}
            type="text"
            className="form-control"
            autoComplete="off"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button type="submit" className="scan-qr">Valider</button>
        </form>
      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editStar }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(StarsEdit));
