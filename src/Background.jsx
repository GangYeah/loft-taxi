import './background.css'
import logo from './assets/logo.svg'
import logo_text from './assets/lofttaxi.png'

function Background(props) {
    return (
        <div className="background">
            <div className="background__left">
                <div className="background__logo">
                    <img src={logo} alt="logo" />
                    <img src={logo_text} alt="logo-text" />
                </div>
            </div>
            <div className="background__right">
                {props.children}
            </div>
        </div>
    );
}

export default Background;