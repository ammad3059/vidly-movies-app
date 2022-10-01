import { Route, Redirect, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "./components/common/navBar";
import Movie from "./components/movie";
import Products from "./components/products";
import Customers from "./components/customers";
import notFound from "./components/notFound";
import LoginForm from "./components/login";
import Register from "./components/register";
import NewMovie from "./components/addMovie";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (error) {}
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route
              path="/movies/:id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <NewMovie {...props} />;
              }}
            ></Route>
            <Route path="/movies/new" component={NewMovie}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route
              path="/movies"
              render={(props) => <Movie {...props} user={user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/not-found" component={notFound}></Route>
            <Route path="/register" component={Register}></Route>
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
