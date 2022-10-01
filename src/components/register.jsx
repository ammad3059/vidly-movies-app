import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/loginService";
import { toast } from "react-toastify";

class Register extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    name: Joi.string().required(),
    password: Joi.string().min(5).required(),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      toast.success("User created successfully!");
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
        <h2>Register Form</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            onChange={this.handleChange}
            value={data.username}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            onChange={this.handleChange}
            value={data.password}
            error={errors.password}
          />
          <Input
            name="name"
            label="Name"
            onChange={this.handleChange}
            value={data.name}
            error={errors.name}
          />
          <button disabled={this.validateError()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
