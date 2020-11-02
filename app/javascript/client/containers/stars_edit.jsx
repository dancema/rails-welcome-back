import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { editStar } from '../actions';
import { Field, reduxForm, SubmissionError } from 'redux-form'






class StarsEdit extends Component {

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <div>
          <input {...field.input} placeholder={field.label} type={field.type}/>
          {field.meta.touched && field.meta.error && <span>{field.meta.error}</span>}
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    this.props.editStar(values, (r) => {
      console.log(r)
      throw new SubmissionError({code: 'false'})
    }
    )
  }

  render() {
    return (

      <div className="container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="channel-editor">
          <Field
            label="Staroffer code"
            name="code"
            type="text"
            component={this.renderField}
          />
          <button type="submit" disabled={this.props.pristine ||this.props.submitting}>Valider</button>
        </form>
      </div>
    );
  }
}




export default withRouter(reduxForm({form: "editStarForm"})(
  connect(null, { editStar })(StarsEdit))
);
