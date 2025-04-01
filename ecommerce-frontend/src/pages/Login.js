import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
    // Estados para manejar el formulario y los errores
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Función para manejar el submit del formulario
    const handleLogin = async (e) => {
        e.preventDefault();  // Evitar el comportamiento por defecto del formulario
        setError("");  // Limpiar errores anteriores

        try {
            // Hacemos la solicitud de login
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),  // Enviamos el username y password
            });

            const data = await response.json();

            if (response.ok) {
                // Si la respuesta es exitosa, guardamos el token en el localStorage
                localStorage.setItem("token", data.access);
                alert("¡Login exitoso! Redirigiendo...");
                window.location.href = "/productos";  // Redirigimos a la página de productos
            } else {
                // Si hay error, mostramos un mensaje
                setError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            setError("Error en la conexión con el servidor");
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}  // Actualizamos el valor de username
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}  // Actualizamos el valor de password
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            {error && <p>{error}</p>}  {/* Si hay un error, lo mostramos */}
        </div>
    );
};

export default Login;

