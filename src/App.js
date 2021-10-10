import './styles.css'

import Login from './Login'
import Register from './Register'

import Header from './Header'

import Map from './Map'
import Profile from './Profile'

import React from 'react';

let PAGES = {
  'map': <Map />,
  'profile': <Profile />,
}

class App extends React.Component {
  state = { currPage: 'map', currMode: 'login' };

  changeCurrentPage = (page) => {
    this.setState({ currPage: page });
  }

  changeCurrentMode = (mode) => {
    this.setState({ currMode: mode });
  }

  renderSwitch(param) {
    switch (param) {
      case 'login':
        return <Login func={this.changeCurrentMode}/>;
      case 'register':
        return <Register func={this.changeCurrentMode}/>;
      case 'after':
        return (
          <>
            <Header func1={this.changeCurrentPage} func2={this.changeCurrentMode} />
            {PAGES[this.state.currPage]}
          </>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderSwitch(this.state.currMode)}
      </div>
    );
  }
}

export default App;
