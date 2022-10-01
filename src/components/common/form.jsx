import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends React.Component {
  validateProperty = ({ name, value }) => {
    let errors = { ...this.state.errors };
    const property = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(property, schema, { abortEarly: false });
    if (!error) {
      delete errors[[name]];
      return errors;
    } else {
      errors[[name]] = error.details[0].message;
      return errors;
    }
  };
  validateError = () => {
    const options = { abortEarly: false };
    let errors = {};
    const { data } = this.state;
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;
    else {
      error.details.map((element) => {
        errors[element.path[0]] = element.message;
      });
      return errors;
    }
  };
  handleChange = ({ currentTarget: inputt }) => {
    const data = { ...this.state.data };
    data[inputt.name] = inputt.value;
    const res = this.validateProperty(inputt);
    this.setState({ data, errors: res });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateError();
    if (errors) {
      this.setState({ errors });
      return;
    } else {
      this.setState({ errors: {} });
      this.doSubmit();
    }
  };
}

export default Form;
