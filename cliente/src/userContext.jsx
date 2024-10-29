import React, { createContext, useState, useEffect } from 'react';
import Login1 from './pages/Component/Login/log'; // Importar el componente Login1

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [recibido, setRecibido] = useState(false)


    useEffect(() => {
        console.log("useEffect ejecutado"); // Verificar si se está ejecutando
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Verificar el token
    
        if (token) {
            const { exp, role, id } = parseJWT(token);
            console.log('Exp:', exp, 'Current:', Date.now() / 1000);
    
            const currentTime = Date.now() / 1000;
    
            if (exp < currentTime) {
                console.log("Token expirado"); // Verificar si el token ha expirado
                localStorage.removeItem('token');
                setUser(null);
            } else {
                console.log("Token válido"); // Confirmar que el token es válido
                setUser({ token, role, id });
    
                const expirationTime = (exp * 1000) - Date.now();
    
                const timeoutId = setTimeout(() => {
                    console.log("token removido");
                    localStorage.removeItem('token');
                    setUser(null);
                    console.log("ya sale")
                }, expirationTime);
    
                return () => clearTimeout(timeoutId);
            }
        } else {
            console.log("No hay token"); // Verificar si no hay token
        }
    
        
    }, [recibido]);
    

    const parseJWT = (token) => {
        if (!token) return {};
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    };

    // Mostrar un loader si estamos verificando el token
    

    return (
        <UserContext.Provider value={{ user, setUser,recibido, setRecibido }}>
            {/* Si no hay token o el token ha expirado, renderiza Login1 */}
            {!user ? <Login1 /> : children}
        </UserContext.Provider>
    );
};
/*
import React, { createContext, useState, useEffect } from 'react';
import Login1 from './pages/Component/Login/log';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const { exp, role } = parseJWT(token);
            const currentTime = Date.now() / 1000;

            if (exp < currentTime) {
                localStorage.removeItem('token');
                setUser(null);
            } else {
                setUser({ token, role });

                // Intervalo para verificar el token
                const intervalId = setInterval(() => {
                    const newCurrentTime = Date.now() / 1000;
                    if (exp < newCurrentTime) {
                        localStorage.removeItem('token');
                        setUser(null);
                    }
                }, 1000); // Verifica cada segundo

                return () => clearInterval(intervalId);
            }
        }

        setLoading(false);
    }, []);

    const parseJWT = (token) => {
        if (!token) return {};
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );

        return JSON.parse(jsonPayload);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {!user ? <Login1 /> : children}
        </UserContext.Provider>
    );
};

*/ 

