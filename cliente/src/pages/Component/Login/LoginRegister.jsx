import React from 'react'
import "./LoginRegister.css";
import { FaUser, FaLock } from "react-icons/fa";

const LoginRegister = () => {
  return (
        <div className='wrapper'>
        <div className='form-box login'>
            <form action="">
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder='Usuario' required /><FaUser className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Contraseña' required /><FaLock className='icon'/>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" /> Recuerdame</label>
                </div>
                <button type='submit'>Ingresar</button>
            </form>
        </div>
    </div>
  )
}


export default LoginRegister