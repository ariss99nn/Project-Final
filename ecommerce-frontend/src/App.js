import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Productos from "./pages/Productos";
import Login from "./pages/Login";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/productos" element={<PrivateRoute element={<Productos />} />} />
            </Routes>
        </Router>
    );
}

export default App;