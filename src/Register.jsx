import React from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Background from './Background'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { selectRegisterFields, selectIsRegistered, register, registerInit } from "./modules/registration";

class Register extends React.Component {
    state = { email: "", login: "", password: "" };

    componentWillUnmount() {
        this.props.registerInit();
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.register(this.state.email, this.state.password, this.state.login, "surname");
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
                    this.props.isRegistered ? (
                        <Redirect to="/login" />) :
                        (
                            <Background>
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
                                    <p className="form__reg">Уже зарегистрированы? <Link to="/login" className="link">Войти</Link></p>
                                </form>
                            </Background>
                        )
                }
            </>
        );
    }
}

export default connect(
    (state) => ({
        regFields: selectRegisterFields(state),
        isRegistered: selectIsRegistered(state)
    }),
    { register, registerInit }
)(Register);