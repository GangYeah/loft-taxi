import './header.css'
import logo from './logo.svg'
import logo_text from './lofttaxi.png'
import PropTypes from "prop-types";
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

function Header(props) {
    let {logout} = useContext(AuthContext);

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
                            <li><button onClick={() => props.changePageHandler('map')} className="header__href">Карта</button></li>
                            <li><button onClick={() => props.changePageHandler('profile')} className="header__href">Профиль</button></li>
                            <li><button onClick={() => logout()} className="header__href">Выйти</button></li>
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

export default Header;