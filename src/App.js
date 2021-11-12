import './styles.css'

import Login from './Login'
import Register from './Register'

import Header from './Header'

import Map from './Map'
import Profile from './Profile'

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { selectIsLoggedIn } from "./modules/authorization";
import { connect } from "react-redux";

class App extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  changeCurrentPage = (page) => {
    this.setState({ currPage: page });
  }

  changeCurrentMode = (mode) => {
    this.setState({ currMode: mode });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/map" component={Map} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </div>
    );
  }
}

let PrivateRoute = ({
  component: RouteComponent,
  isLoggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isLoggedIn ? (
        <>
          <RouteComponent {...routeProps} />
          <Header />
        </>
      ) : (
        <Redirect to="/register" />
      )
    }
  />
);

PrivateRoute = connect((state) => ({
  isLoggedIn: state.auth.isLoggedIn
}))(PrivateRoute);

export default connect((state) => ({ isLoggedIn: selectIsLoggedIn(state) }))(App);
