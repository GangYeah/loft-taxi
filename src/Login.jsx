import React from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

import { authenticate, selectIsLoggedIn, selectAuthError } from "./modules/authorization";
import Background from './Background'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as yup from 'yup';

class Login extends React.Component {
    isFilled(values) {
        return Object.values(values).filter(item => item === "").length !== 0;
    }

    render() {
        return (
            <>
                {
                    this.props.isLoggedIn ? (
                        <Redirect to="/map" />) :
                        (
                            <Background>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={(values, actions) => {
                                        this.props.authenticate(values.email, values.password);
                                        actions.setSubmitting(false);
                                    }}
                                    validationSchema={yup.object({
                                        email: yup
                                            .string()
                                            .email('Введите email'),
                                    })}
                                >
                                    {
                                        props => (
                                            <form onSubmit={props.handleSubmit} className="form" noValidate>
                                                <h2>Вход</h2>
                                                <div className="error error--mt">{this.props.authError}</div>
                                                <div className="form__fields">
                                                    <label className="form__label">
                                                        Email
                                                        <Input
                                                            type="email"
                                                            name="email"
                                                            value={props.values.email}
                                                            onChange={props.handleChange}
                                                            aria-describedby="component-helper-text-email"
                                                            error={props.touched.email && Boolean(props.errors.email)}
                                                        />
                                                        <FormHelperText id="component-helper-text-email">
                                                            {props.touched.email && props.errors.email}
                                                        </FormHelperText>
                                                    </label>
                                                    <label className="form__label">
                                                        Пароль
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            value={props.values.password}
                                                            onChange={props.handleChange}
                                                        />
                                                        <button type="button" className="form__label-caption ">Забыли пароль?</button>
                                                    </label>
                                                </div>
                                                <Button variant="contained" className="form__button" disabled={this.isFilled(props.values)} type="submit">Войти</Button>
                                                <p className="form__reg">Новый пользователь? <Link to="/register" className="link">Регистрация</Link></p>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </Background>
                        )
                }
            </>);
    }
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool,
    authError: PropTypes.string,
    authenticate: PropTypes.func
}

export default connect(
    (state) => ({
        isLoggedIn: selectIsLoggedIn(state),
        authError: selectAuthError(state)
    }),
    { authenticate }
)(Login);