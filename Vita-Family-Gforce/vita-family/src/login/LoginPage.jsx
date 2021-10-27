import React from 'react';
import logo from './vitafamily-logo.png'
import "./loginStyles.css"
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage(){
    const { loginWithRedirect } = useAuth0();
    return(
        <div> 
            <div className="contenedor">
                <img className="vflogo" src={logo} alt="VitaFamily"/>
                <div className="google-btn">
                    <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt=""/>
                    </div>
                    <a href="#" className="btn-text" onClick={() => loginWithRedirect()}><b>Iniciar sesión con Google</b></a>
                </div>
                <form className="form" id="login-form">
                    <div className="form-div">
                        <label for="user">Correo</label>
                        <input type="text" id="user" autocomplete="off"/>
                    </div>
                    <div className="form-div">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password"/>
                    </div>
                    <div className="form-div" id="submit">
                        <button type="submit" name="login" form="login-form" className = "btn-login">Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
