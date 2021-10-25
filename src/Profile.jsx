import './profile.css'
import logo from './logo.svg'
import chip from './vector1.svg'

import { useState } from 'react';
import { fetch_card } from "./actions";
import { connect } from "react-redux";

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

function Profile(props) {
    const [cardName, setCardName] = useState(props.cardData.cardName);
    const [cardNumber, setCardNumber] = useState(props.cardData.cardNumber);
    const [expireDate, setExpireDate] = useState(props.cardData.expireDate);
    const [cvc, setCvc] = useState(props.cardData.cvc);

    const handleCardNameChange = e => {
        setCardName(e.target.value);
    }
    const handleCardNumberChange = e => {
        setCardNumber(e.target.value);
    }
    const handleExpireDateChange = e => {
        setExpireDate(e.target.value);
    }
    const handleCvcChange = e => {
        setCvc(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        props.fetch_card(...Array.from(new FormData(e.target).values()));
    }
    return (
        <div className="page">
            <div className="profile">
                <form name="bank_card" onSubmit={handleSubmit} className="form profile__form">
                    <h1 className="profile__title">Профиль</h1>
                    <p className="profile__subtitle">Введите платежные данные</p>
                    <div className="profile__container">
                        <div className="profile__left form__fields">
                            <label className="form__label">
                                Имя владельца
                                <Input
                                    type="text"
                                    name="cardName"
                                    value={cardName}
                                    onChange={handleCardNameChange}
                                />
                            </label>
                            <label className="form__label profile__label">
                                Номер карты
                                <Input
                                    type="text"
                                    name="cardNumber"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                />
                            </label>
                            <div className="form__fields form__fields--hor profile__fields">
                                <label className="form__label profile__left-label">
                                    MM/YY
                                    <Input
                                        type="text"
                                        name="expireDate"
                                        value={expireDate}
                                        onChange={handleExpireDateChange}
                                    />
                                </label>
                                <label className="form__label">
                                    CVC
                                    <Input
                                        type="number"
                                        name="cvc"
                                        value={cvc}
                                        onChange={handleCvcChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="profile__right">
                            <div className="card">
                                <div className="card__row">
                                    <img className="card__loft-icon" src={logo} alt="logo" />
                                    <span className="card__mmyy">05/08</span>
                                </div>
                                <p className="card__number">5545 2300 3432 4521</p>
                                <div className="card__row">
                                    <img src={chip} alt="logo" />
                                    <div className="circles">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" type="submit">Сохранить</Button>
                </form>
            </div>
        </div>
    );
}

export default connect(
    (state) => ({ cardData: state.card }),
    { fetch_card }
)(Profile);