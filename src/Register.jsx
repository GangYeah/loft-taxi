import React from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Background from './Background'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { selectRegisterFields, selectIsRegistered, selectRegisterError, register, registerInit,  } from "./modules/registration";
import { Formik } from 'formik'
import * as yup from 'yup';

class Register extends React.Component {
    componentWillUnmount() {
        this.props.registerInit();
    }

    isFilled(...values) {
        return values.filter(item => item === "").length !== 0;
    }

    render() {
        return (
            <>
                {
                    this.props.isRegistered ? (
                        <Redirect to="/login" />) :
                        (
                            <Background>
                                <Formik initialValues={{ email: '', login: '', password: '' }}
                                    onSubmit={(values, actions) => {
                                        this.props.register(values.email, values.password, values.password, 'surname');
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
                                                <h2>Регистрация</h2>
                                                <div className="error">{this.props.regError}</div>
                                                <div className="form__fields">
                                                    <label className="form__label">
                                                        Email*
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
                                                        Как вас зовут?
                                                        <Input
                                                            type="text"
                                                            name="login"
                                                            value={props.values.login}
                                                            onChange={props.handleChange}
                                                        />
                                                    </label>
                                                    <label className="form__label">
                                                        Придумайте пароль*
                                                        <Input
                                                            type="password"
                                                            name="password"
                                                            value={props.values.password}
                                                            onChange={props.handleChange}
                                                        />
                                                    </label>
                                                </div>
                                                <Button variant="contained" className="form__button" disabled={this.isFilled(props.values.email, props.values.password)} type="submit">Зарегистрироваться</Button>
                                                <p className="form__reg">Уже зарегистрированы? <Link to="/login" className="link">Войти</Link></p>
                                            </form>
                                        )
                                    }
                                </Formik>
                            </Background>
                        )
                }
            </>
        );
    }
}

Register.propTypes = {
    regFields: PropTypes.object,
    regError: PropTypes.string,
    isRegistered: PropTypes.bool,
    register: PropTypes.func, 
    registerInit: PropTypes.func 
}

export default connect(
    (state) => ({
        regFields: selectRegisterFields(state),
        regError: selectRegisterError(state),
        isRegistered: selectIsRegistered(state),
    }),
    { register, registerInit }
)(Register);