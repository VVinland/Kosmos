import React, { useContext, useState } from 'react';
import { Context } from '../..';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const { userStore } = useContext(Context);

    const loginUser = async () => {
        try {
            await userStore.login(login, password);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="loginForm">
            <label className='loginForm__label'> Логин
                <input type="text" className='loginForm__label'
                    value={login}
                    onChange={event => setLogin(event.target.value)}
                    placeholder='Введите логин' /></label>


            <label className='loginForm__label'> Пароль 
            <input type="password" className='loginForm__label'
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder='Введите пароль' /></label>

            <button className="loginForm__button" onClick={loginUser}>Авторизоваться</button>
        </div>
    );
}

export default LoginForm;