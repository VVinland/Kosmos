import React, { useState } from 'react';
import LoginForm from '../components/loginForm/Login-form';
import RegistrationForm from '../components/registrationForm/Registration-form';
import { NavLink } from 'react-router-dom';
import './public-page.scss';

const PublicPage = () => {
    const initForm = () => {
        if (localStorage.getItem('publicForm')) {
            const isActive = JSON.parse(localStorage.getItem('publicForm')!);
            return isActive;
        }
        return true;
    }

    const [form, setForm] = useState(initForm());

    const setActiveForm = () => {
        localStorage.setItem('publicForm', JSON.stringify(!form));
        setForm(!form);
    }

    return (
        <div className="publicPage">
            {form ? <LoginForm /> : <RegistrationForm />}
            <div className="publicPage__transition">
                <h1>Перейти в окно <NavLink to={''}
                    onClick={() => setActiveForm()}>{form ? 'регистрации' : 'авторизации'}
                </NavLink> </h1>
            </div>
        </div>
    )
}

export default PublicPage;