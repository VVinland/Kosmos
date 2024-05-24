import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/appRouter/App-router';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

const App = observer(() => {

    const { userStore } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            userStore.checkAuth();
        }
    }, []);

    if (userStore.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="app">
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </div>
    );
});

export default App;