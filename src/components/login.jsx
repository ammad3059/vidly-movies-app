import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./common/input";
import Form from "./common/form";
import { login } from "../services/loginService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" }, // can't use undefined or null
    errors: {},
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    console.log("Login Clicked");
    try {
      const { data: jwt } = await login(this.state.data);
      localStorage.setItem("token", jwt);
      console.log(jwt);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            label="Username"
            name="username"
            value={data.username}
            error={errors.username}
          />
          <Input
            onChange={this.handleChange}
            label="Password"
            name="password"
            value={data.password}
            error={errors.password}
          />
          <button disabled={this.validateError()} className="btn btn-secondary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
