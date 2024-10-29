// RutasProtegidas.js
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../userContext';
import Login1 from './Login/log';

function RutasProtegidas() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <Login1 />;
    }

    // Puedes usar user.role para comprobar el rol del usuario
    // Aquí simplemente estamos asegurándonos de que el usuario esté autenticado

    return <Outlet />;
}

export default RutasProtegidas;






/*import React from 'react';
import { Outlet } from 'react-router-dom';
import Login1 from './Login/log';
import { Root } from './Root';

function parseJWT(token) {
    if (!token) return false;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const RutasProtegidas = () => {
    const token = localStorage.getItem('token');
    const tokenExistAndStillValid = token && parseJWT(token).exp * 1000 > Date.now();

    return <>{tokenExistAndStillValid ? <Root /> : <Login1 />}</>;
}

export default RutasProtegidas;*/
