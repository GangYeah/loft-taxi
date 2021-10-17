import React from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import PropTypes from "prop-types";

class Register extends React.Component {
    static propTypes = {
        changeModeHandler: PropTypes.func
    }

    state = { email: "", login: "", password: "" };

    handleSubmit = event => {
        event.preventDefault();
        this.props.changeModeHandler(true);   
    };

    handleChange = event => {
        this.setState({[event.target.name] : event.target.value});
    };

    isValid() {
        return Object.values(this.state).filter(item => item === "").length !== 0;
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className="form" noValidate>
                    <h2>Регистрация</h2>
                    <div className="form__fields">
                        <label className="form__label">
                            Email*
                            <Input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="form__label">
                            Как вас зовут?
                            <Input
                                type="text"
                                name="login"
                                value={this.state.login}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="form__label">
                            Придумайте пароль*
                            <Input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <Button variant="contained" className="form__button" disabled={this.isValid()} type="submit">Зарегистрироваться</Button>
                    <p className="form__reg">Уже зарегистрированы? <button type="button" onClick={() => this.props.changeModeHandler(true)} className="link">Войти</button></p>
                </form>

            </>
        );
    }
}

export default Register;