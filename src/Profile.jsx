import './profile.css'
import logo from './assets/logo.svg'
import chip from './assets/vector1.svg'

import { Link } from 'react-router-dom';
import { sendCard, selectCardDetails, selectCardDetailsError } from "./modules/payment";
import { selectAuthToken } from "./modules/authorization";
import { useSelector, useDispatch } from "react-redux";
import * as yup from 'yup';

import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import InputMask from 'react-input-mask';
import Input from '@mui/material/Input';
import { useFormik } from 'formik';

function Profile() {
    const cardDetails = useSelector(state => selectCardDetails(state));
    const cardDetailsError = useSelector(state => selectCardDetailsError(state));
    const token = useSelector(state => selectAuthToken(state));

    const dispatch = useDispatch();

    function isValidExpiryDate() {
        return this.test("isValidExpiryDate", function (value) {
            if (!value) {
                return false;
            }
            const { path, createError } = this;
            let today, someday;
            let [exMonth, exYear] = value.split('/');

            if (exMonth > 13)
                return createError({
                    path,
                    message: 'Месяцев всего 12!'
                });
            today = new Date();
            someday = new Date();
            someday.setFullYear(parseInt(exYear, 10) + 2000, exMonth, 1);

            if (someday < today) {
                return createError({
                    path,
                    message: 'Дата должна быть позже сегодняшней даты!'
                });
            }

            return true;
        });
    }
    yup.addMethod(yup.string, "isValidExpiryDate", isValidExpiryDate);

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
            .isValidExpiryDate(),
        cvc: yup
            .string()
            .required('Это обязательное поле!')
            .matches(/^\d{3}$/, 'Неверный формат')
    });

    const formik = useFormik({
        initialValues: cardDetails,
        onSubmit: (values, actions) => {
            actions.setSubmitting(true);
            dispatch(sendCard(values.cardName, values.cardNumber, values.expiryDate, values.cvc, token));
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
                        <form onSubmit={formik.handleSubmit} className="form profile__form">
                            <h1 className="profile__title">Профиль</h1>
                            <p className="profile__subtitle">Введите платежные данные</p>
                            <div className="error">{cardDetailsError}</div>
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
                                            <InputMask
                                                mask="99/99"
                                                onChange={formik.handleChange}
                                                value={formik.values.expiryDate}>
                                                {(inputProps) => <Input
                                                    {...inputProps}
                                                    type="text"
                                                    name="expiryDate"
                                                    aria-describedby="component-helper-text-expiryDate"
                                                    error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                                />}
                                            </InputMask>
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
                                            <span id="cardMmYy" className="card__mmyy">{cardDetails.expiryDate || "XX/XX"}</span>
                                        </div>
                                        <p id="cardNumber" className="card__number">{cardDetails.cardNumber || "XXXX XXXX XXXX XXXX"}</p>
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

export default Profile;