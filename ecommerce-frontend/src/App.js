import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Página de Inicio</h1>} />
                <Route path="/productos" element={<h1>Página de Productos</h1>} />
                <Route path="/carrito" element={<h1>Página del Carrito</h1>} />
                <Route path="/login" element={<h1>Página de Login</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
