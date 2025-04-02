import React, { useState, useContext } from "react";
import  UserContext from "../context/UserContext";

const Login = () => {
    // Estados para manejar el formulario y los errores
    const {login} = useContext(UserContext);
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await login ({email, password}); //Llama la funcion del contexto
    };
    
    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Contraseña" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Iniciar Sesion</button>
            </form>
        </div>
            );
};

export default Login;

