import './header.css'

import logo from './logo.svg'
import logo_text from './lofttaxi.png'

function Header(props) {
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
                            <li><button onClick={() => props.func1('map')} className="header__href">Карта</button></li>
                            <li><button onClick={() => props.func1('profile')} className="header__href">Профиль</button></li>
                            <li><button onClick={() => props.func2('login')} className="header__href">Выйти</button></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;