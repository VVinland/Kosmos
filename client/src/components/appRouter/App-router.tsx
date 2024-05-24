import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../routes/routes';
import { MAIN_ROUTE, PUBLIC_ROUTE } from '../../utils/consts';
import { Context } from '../..';
import { RouteStructure } from '../../types';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {

    const { userStore } = useContext(Context);

    const setRoutes = (array: RouteStructure[], otherWay: string) => {
        return (
            <Routes>
                {array.map(item => {
                    return <Route key={item.path}
                        path={item.path}
                        element={<item.component />} />
                })}
                <Route path='*' element={<Navigate to={otherWay} />} />
            </Routes>
        );
    }

   

    if (!userStore.isAuth) {
        return setRoutes(publicRoutes, PUBLIC_ROUTE);
    }


    if (userStore.isAuth) {
        return setRoutes(authRoutes, MAIN_ROUTE);
    }

})

export default AppRouter;