import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { editStar } from '../actions';
import { Field, reduxForm, SubmissionError } from 'redux-form'


const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length != max ? `Must be ${max} characters` : undefined
const maxLength8 = maxLength(8)

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
    return this.props.editStar(values, (r) => {

      if (r.status === 404){
        throw new SubmissionError({_error:"code incorrect"})
      } else if (r.status == 409) {
        throw new SubmissionError({_error:"code deja utilise"})
      } else if (r.status == 200) {
        window.alert('Bravo')
      }
    })
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
            validate={maxLength8}
          />
          {this.props.error && <strong>{this.props.error}</strong>}
          <button type="submit" disabled={this.props.pristine ||this.props.submitting}>Valider</button>
        </form>
      </div>
    );
  }
}




export default withRouter(reduxForm({form: "editStarForm"})(
  connect(null, { editStar })(StarsEdit))
);
