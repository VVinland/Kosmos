import React, { useContext, useState } from 'react';
import { Context } from '../..';
import './login-form.scss';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { userStore } = useContext(Context);

    const loginUser = async () => {
        try {
            await userStore.login(login.trim(), password.trim());
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="loginForm">
            <div className='loginForm__item'>
                <label htmlFor='login' className='loginForm__label'> Логин
                </label>
                <input id='login' type="text" className='loginForm__input'
                    value={login}
                    autoComplete='off'
                    onChange={event => setLogin(event.target.value)}
                    placeholder='Введите логин' />
            </div>

            <div className='loginForm__item'>
                <label htmlFor='password' className='loginForm__label' id='login'> Пароль
                </label>
                <input id='password' type="password" className='loginForm__input'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    placeholder='Введите пароль' />
            </div>

            <button className="loginForm__button" onClick={loginUser}>Авторизоваться</button>
        </div>
    );
}

export default LoginForm;