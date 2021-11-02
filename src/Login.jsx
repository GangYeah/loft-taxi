import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Background from './Background'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";
import { authenticate, selectIsLoggedIn } from "./modules/authorization";
import { connect } from "react-redux";

class Login extends React.Component {
    static propTypes = {
        login: PropTypes.func,
    }
    state = { email: "", password: "" };

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = event.target;
        this.props.authenticate(email.value, password.value);
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    isValid() {
        return Object.values(this.state).filter(item => item === "").length !== 0;
    }

    render() {
        return (
            <>
                {
                    this.props.isLoggedIn ? (
                        <Redirect to="/map" />) :
                        (
                            <Background>
                                <form onSubmit={this.handleSubmit} className="form" noValidate>
                                    <h2>Вход</h2>
                                    <div className="form__fields">
                                        <label className="form__label">
                                            Email
                                            <Input
                                                type="email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </label>
                                        <label className="form__label">
                                            Пароль
                                            <Input
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                            <button type="button" onClick={(e) => e.preventDefault()} className="form__label-caption ">Забыли пароль?</button>
                                        </label>
                                    </div>
                                    <Button variant="contained" className="form__button" disabled={this.isValid()} type="submit">Войти</Button>
                                    <p className="form__reg">Новый пользователь? <Link to="/register" className="link">Регистрация</Link></p>
                                </form>
                            </Background>
                        )
                }
            </>);
    }
}
export default connect(
    (state) => ({ isLoggedIn: selectIsLoggedIn(state) }),
    { authenticate }
)(Login);