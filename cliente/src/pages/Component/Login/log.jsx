import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { UserContext } from '../../../userContext';
import './LoginRegister.css'
const Login1 = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { setUser, recibido, setRecibido } = useContext(UserContext);

    const manejarEnviar = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };

        // Aquí empieza la petición
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                if (result.token) {
                    // Extraer el payload del token
                    const { role } = parseJWT(result.token);
                    localStorage.setItem('token', result.token);
                    setUser({ token: result.token, role });
                    setRecibido(!recibido);// Asegúrate de establecer también el rol del usuario
                } else {
                    setUser(null);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

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

    return (
        <div className='contenedorbody'>
            <div className='wrapper'>
                <div className='form-box login'>
                    <form action="">
                        <h1>Acceso</h1>
                        <div className="input-box">
                            <input onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder='Usuario' required /><FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Contraseña' required /><FaLock className='icon' />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" /> Recuérdame</label>
                        </div>
                        <button onClick={manejarEnviar}>Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login1;

