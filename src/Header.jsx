import React from "react";

import './header.css'
import logo from './assets/logo.svg'
import logo_text from './assets/lofttaxi.png'
import { Link, useHistory } from 'react-router-dom';
import { logOut } from './modules/authorization'
import { useDispatch } from 'react-redux'

function Header() {
    const history = useHistory();
    const dispatch = useDispatch()
    
    function handleClick() {
        dispatch(logOut())
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

export default Header;