import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import PropTypes from "prop-types";

class Login extends React.Component {
    static propTypes = {
        login: PropTypes.func,
        changeModeHandler: PropTypes.func
    }

    state = { email: "", password: "" };

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = event.target;
        this.props.login(email.value, password.value);
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
                    <p className="form__reg">Новый пользователь? <button onClick={() => this.props.changeModeHandler(false)} className="link">Регистрация</button></p>
                </form>
            </>
        );
    }
}
export default Login;