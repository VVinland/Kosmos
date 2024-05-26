import React, { useContext, useState } from 'react';
import { CandidateForNewUsers } from '../../types';
import { Context } from '../..';
import './registration-form.scss';

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
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                middlename: middlename.trim(),
                login: login.trim(),
                password: password.trim(),
                supervisor: supervisor.trim()
            }
            await userStore.registration(candidate);
            alert('Пользователь успешно зарегистрировался');
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className="registrationForm">
            <div className="registrationForm__item">
                <label htmlFor="firstname" className="registrationForm__label">Имя
                </label>
                <input id='firstname' className='registrationForm__input' type="text"
                    value={firstname}
                    autoComplete='off'
                    onChange={event => setFirstname(event.target.value)}
                    placeholder='Введите имя' />
            </div>

            <div className="registrationForm__item">
                <label htmlFor="lastname" className="registrationForm__label">Фамилия
                </label>
                <input id='lastname' className='registrationForm__input' type="text"
                    value={lastname}
                    autoComplete='off'
                    onChange={event => setLastname(event.target.value)}
                    placeholder='Введите фамилию' />
            </div>

            <div className="registrationForm__item">
                <label htmlFor="middlename" className="registrationForm__label">Отчество
                </label>
                <input id='middlename' className='registrationForm__input' type="text"
                    value={middlename}
                    autoComplete='off'
                    onChange={event => setMiddlename(event.target.value)}
                    placeholder='Введите отчество' />
            </div>
            <div className="registrationForm__item">
                <label htmlFor="login" className="registrationForm__label">Логин
                </label>
                <input id='login' className='registrationForm__input' type="text"
                    value={login}
                    autoComplete='off'
                    onChange={event => setLogin(event.target.value)}
                    placeholder='Введите логин' />
            </div>
            <div className="registrationForm__item">
                <label htmlFor="password" className="registrationForm__label">Пароль
                </label>
                <input id='password' className='registrationForm__input' type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder='Введите пароль' />
            </div>

            <div className="registrationForm__item">
                <label id='supervisorId' htmlFor="supervisor" className="registrationForm__label">Руководитель
                
                    </label>
                <input id='supervisor' className='registrationForm__input' type="text"
                    value={supervisor}
                    autoComplete='off'
                    onChange={event => setSupervisor(event.target.value)}
                    placeholder='Введите имя руководителя' />
            </div>

            <button className="registrationForm__button"
                onClick={registrationUser}>Регистрация</button>
        </div>
    );
}

export default RegistrationForm;