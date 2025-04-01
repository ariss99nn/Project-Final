import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import "../styles/Navbar.css";

const Navbar = () => {
    const { user } = useContext(UserContext);
    return (
        <nav className="navbar">
            <h1 className="logo">Mi eCommerce</h1>
            <ul className="nav-links">
            <li>{user ? (<span>Bienvenido, {user.username}</span>
          ) : (
            <Link to="/login">Iniciar Sesión</Link>
          )}
        </li>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;