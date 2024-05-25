import React, { Suspense, useContext, useState } from 'react';
import { CandidateForNewUsers } from '../../types';
import UserStore from '../../store/User-store';
import { Context } from '../..';

const RegistrationForm = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [supervisor, setSupervisor] = useState('');

    const { userStore } = useContext(Context);

    const registrationUser = async () => {
        try { 
            const candidate: CandidateForNewUsers = {
                firstname: firstname.replaceAll(' ', ''),
                lastname: lastname.replaceAll(' ', ''),
                middlename: middlename.replaceAll(' ', ''),
                login: login.replaceAll(' ', ''),
                password: password.replaceAll(' ', ''),
                supervisor: supervisor.replaceAll(' ', '')
            }
            await userStore.registration(candidate);
            alert('Пользователь успешно зарегистрировался');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="registrationForm">
            <label htmlFor="" className="registrationForm__label">Имя
                <input className='registrationForm__input' type="text"
                    value={firstname}
                    onChange={event => setFirstname(event.target.value)}
                    placeholder='Введите имя' /></label>
            <label htmlFor="" className="registrationForm__label">Фамилия
                <input className='registrationForm__input' type="text"
                    value={lastname}
                    onChange={event => setLastname(event.target.value)}
                    placeholder='Введите фамилию' /></label>
            <label htmlFor="" className="registrationForm__label">Отчество
                <input className='registrationForm__input' type="text"
                    value={middlename}
                    onChange={event => setMiddlename(event.target.value)}
                    placeholder='Введите отчество' /></label>
            <label htmlFor="" className="registrationForm__label">Логин
                <input className='registrationForm__input' type="text"
                    value={login}
                    onChange={event => setLogin(event.target.value)}
                    placeholder='Введите логин' /></label>
            <label htmlFor="" className="registrationForm__label">Пароль
                <input className='registrationForm__input' type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder='Введите пароль' /></label>
            <label htmlFor="" className="registrationForm__label">Руководитель
                <input className='registrationForm__input' type="text"
                    value={supervisor}
                    onChange={event => setSupervisor(event.target.value)}
                    placeholder='Введите имя руководителя' /></label>
            <button className="loginForm__button"
                onClick={registrationUser}>Регистрация</button>
        </div>
    );
}

export default RegistrationForm;