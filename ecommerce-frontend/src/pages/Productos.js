import React, { useState, useEffect } from "react";
import "../styles/Productos.css";

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // Función para obtener los productos con el token
    const getProductos = async () => {
       const token = localStorage.getItem("token"); // Obtener el token

        if (!token) {
            setError("No tienes acceso. Inicia sesión.");
            setCargando(false);
            return;
        }

        try {
            //Hacer la solicitud a la API con el token en la cabecera
            const response = await fetch("http://localhost:8000/api/productos/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Aquí se añade el token en el encabezado
                },
            });

            if (!response.ok) {
                throw new Error("Acceso denegado");
            }

            //const data = await response.json();
            //setProductos(data);
            //setCargando(false);
        } catch (err) {
            console.error("Error:", err);
            //setError("No tienes permisos para ver los productos.");
            setCargando(false);
        }
    };

    // Llamamos a la función al cargar el componente
    //useEffect(() => {
        //getProductos(); // Llamamos a la función para obtener los productos
    //}, []);

    return (
        <div className="productos-container">
            <h1>Nuestros Productos</h1>
            {cargando ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div className="productos-grid">
                    {productos.map((producto) => (
                        <div key={producto.id} className="producto-card">
                            <img src={producto.imagen} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p>${producto.precio}</p>
                            <a href="#" className="btn">Comprar</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Productos;
