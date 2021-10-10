import React from "react";

class Register extends React.Component {
    fields = { email: "", login: "", password: "" };

    handleSubmit = event => {
        event.preventDefault();
        if (Object.values(this.fields).filter(item => item === "").length === 0)
            this.props.func('login');
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
                    <h2>Регистрация</h2>
                    <div className="form__fields">
                        <label className="form__label">
                            Email*
                            <input className="form__input"
                                type="email"
                                name="email"
                                value={this.fields.email}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="form__label">
                            Как вас зовут?
                            <input className="form__input"
                                type="text"
                                name="login"
                                value={this.fields.login}
                                onChange={this.handleChange}
                            />
                        </label>
                        <label className="form__label">
                            Придумайте пароль*
                            <input className="form__input"
                                type="password"
                                name="password"
                                value={this.fields.password}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <button id="form-button" className="button form__button">Зарегистрироваться</button>
                    <p className="form__reg">Уже зарегистрированы? <button onClick={() => this.props.func('login')} className="link">Войти</button></p>
                </form>

            </>
        );
    }
}

export default Register;