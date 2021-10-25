import React from "react";

import './header.css'
import logo from './logo.svg'
import logo_text from './lofttaxi.png'
import PropTypes from "prop-types";
import { Link, useHistory } from 'react-router-dom';
import {logIn, logOut} from './actions'
import {connect} from 'react-redux'

function Header(props) {
    let history = useHistory();

    function handleClick() {
        props.logOut();
        history.push("/login");
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__bar">
                    <div className="header__logo">
                        <img src={logo} alt="logo" />
                        <img src={logo_text} alt="logo-text" />
                    </div>
                    <nav className="header__nav">
                        <ul>
                            <li><Link to="/map" className="header__href">Карта</Link></li>
                            <li><Link to="/profile" className="header__href">Профиль</Link></li>
                            <li><button onClick={handleClick} className="header__href">Выйти</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

Header.propTypes = {
    changePageHandler: PropTypes.func,
    logout: PropTypes.func,
}

export default connect(
    null,
    { logIn, logOut }
  )(Header);