import React from 'react';

class Login extends React.Component {
    fields = { email: "", password: "" };

    handleSubmit = event => {
        event.preventDefault();
        if (Object.values(this.fields).filter(item => item === "").length === 0)
            this.props.func('after');
    };

    handleChange = event => {
        this.fields[event.target.name] = event.target.value;
        if (Object.values(this.fields).filter(item => item === "").length === 0) {
            document.getElementById('form-button').className = "button form__button button--ready";
        }
        else {
            document.getElementById('form-button').className = "button form__button";
        }
        this.forceUpdate()
    };
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} className="form">
                    <h2>Вход</h2>
                    <div className="form__fields">
                        <label className="form__label">
                            Email
                            <input className="form__input"
                                type="email"
                                name="email"
                                value={this.fields.email}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="form__label">
                            Пароль
                            <input className="form__input"
                                type="password"
                                name="password"
                                value={this.fields.password}
                                onChange={this.handleChange}
                            />
                            <button onClick={(e) => e.preventDefault()} className="form__label-caption ">Забыли пароль?</button>
                        </label>
                    </div>
                    <button id="form-button" className="button form__button">Войти</button>
                    <p className="form__reg">Новый пользователь? <button onClick={() => this.props.func('register')} className="link">Регистрация</button></p>
                </form>

            </>
        );
    }
}
export default Login;