import './profile.css'
import logo from './logo.svg'
import chip from './vector1.svg'

import { Link } from 'react-router-dom';
import { fetch_card, requestCard, selectCardDetails } from "./modules/payment";
import { selectAuthToken } from "./modules/authorization";
import { connect } from "react-redux";
import * as yup from 'yup';

import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { useFormik } from 'formik';

function Profile(props) {
    const validationSchema = yup.object({
        cardName: yup
            .string()
            .required('Это обязательное поле!')
            .matches(/^[a-zA-Z ]+$/, 'Неверный формат'),
        cardNumber: yup
            .string()
            .required('Это обязательное поле!')
            .matches(/^([0-9]{4}\s*){4}$/, 'Неверный формат'),
        expiryDate: yup
            .string()
            .required('Это обязательное поле!')
            .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Неверный формат'),
        cvc: yup
            .string()
            .required('Это обязательное поле!')
            .matches(/^\d{3}$/, 'Неверный формат')
    });

    const formik = useFormik({
        initialValues: props.cardDetails,
        onSubmit: (values, actions) => {
            actions.setSubmitting(true);
            props.fetch_card(values.cardName, values.cardNumber, values.expiryDate, values.cvc, props.authToken);
        },
        validationSchema: validationSchema,
    });
    
    return (
        <div className="page">
            <div className="profile">
                {
                    formik.isSubmitting ? (
                        <div className="form profile__dialog">
                            <h1 className="profile__title">Профиль</h1>
                            <p style={{ marginBottom: '25px' }}>Платёжные данные обновлены. Теперь вы можете заказывать такси.</p>
                            <Link to="/map"><Button variant="contained">Перейти на карту</Button></Link>
                        </div>
                    ) : (
                        <form name="bank_card" onSubmit={formik.handleSubmit} className="form profile__form">
                            <h1 className="profile__title">Профиль</h1>
                            <p className="profile__subtitle">Введите платежные данные</p>
                            <div className="profile__container">
                                <div className="profile__left form__fields">
                                    <label className="form__label">
                                        Имя владельца
                                        <Input
                                            type="text"
                                            name="cardName"
                                            value={formik.values.cardName}
                                            onChange={formik.handleChange}
                                            aria-describedby="component-helper-text-cardName"
                                            error={formik.touched.cardName && Boolean(formik.errors.cardName)}
                                        />
                                        <FormHelperText id="component-helper-text-cardName">
                                            {formik.touched.cardName && formik.errors.cardName}
                                        </FormHelperText>
                                    </label>
                                    <label className="form__label profile__label">
                                        Номер карты
                                        <Input
                                            type="text"
                                            name="cardNumber"
                                            value={formik.values.cardNumber}
                                            onChange={formik.handleChange}
                                            aria-describedby="component-helper-text-cardNumber"
                                            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                                        />
                                        <FormHelperText id="component-helper-text-cardNumber">
                                            {formik.touched.cardNumber && formik.errors.cardNumber}
                                        </FormHelperText>
                                    </label>
                                    <div className="form__fields form__fields--hor profile__fields">
                                        <label className="form__label profile__left-label">
                                            MM/YY
                                            <Input
                                                type="text"
                                                name="expiryDate"
                                                value={formik.values.expiryDate}
                                                onChange={formik.handleChange}
                                                aria-describedby="component-helper-text-expiryDate"
                                                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                            />
                                            <FormHelperText id="component-helper-text-expiryDate">
                                                {formik.touched.expiryDate && formik.errors.expiryDate}
                                            </FormHelperText>
                                        </label>
                                        <label className="form__label">
                                            CVC
                                            <Input
                                                type="text"
                                                name="cvc"
                                                value={formik.values.cvc}
                                                onChange={formik.handleChange}
                                                aria-describedby="component-helper-text-cvc"
                                                error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                                            />
                                            <FormHelperText id="component-helper-text-cvc">
                                                {formik.touched.cvc && formik.errors.cvc}
                                            </FormHelperText>
                                        </label>
                                    </div>
                                </div>
                                <div className="profile__right">
                                    <div className="card">
                                        <div className="card__row">
                                            <img className="card__loft-icon" src={logo} alt="logo" />
                                            <span id="cardMmYy" className="card__mmyy">{props.cardDetails.expiryDate || "XX/XX"}</span>
                                        </div>
                                        <p id="cardNumber" className="card__number">{props.cardDetails.cardNumber || "XXXX XXXX XXXX XXXX"}</p>
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
                    )
                }
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        cardDetails: selectCardDetails(state),
        authToken: selectAuthToken(state)
    }),
    { fetch_card, requestCard }
)(Profile);