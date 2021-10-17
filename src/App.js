import './styles.css'

import { withAuth } from './AuthContext'
import Login from './Login'
import Register from './Register'

import Background from './Background'
import Header from './Header'

import Map from './Map'
import Profile from './Profile'

import React from 'react';
import PropTypes from 'prop-types';

let PAGES = {
  'map': <Map />,
  'profile': <Profile />,
}

class App extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool
  }

  state = { currPage: 'map', currMode: true };

  changeCurrentPage = (page) => {
    this.setState({ currPage: page });
  }

  changeCurrentMode = (mode) => {
    this.setState({ currMode: mode });
  }

  render() {
    return (
      <div className="App">
        {
          this.props.isLoggedIn ? (
            <>
              <div className="page">
                {PAGES[this.state.currPage]}
              </div>
              <Header {...this.props} changePageHandler={this.changeCurrentPage} />
            </>
          ) : (
            <Background>
              {
              this.state.currMode ? (
                <Login {...this.props} changeModeHandler={this.changeCurrentMode} />
              ) : (
                <Register changeModeHandler={this.changeCurrentMode} />
              )
              }
            </Background>
          )
        }
      </div>
    );
  }
}

export default withAuth(App);
