import React, { createContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicialmente, no hay usuario autenticadoo
  const [token, setToken] = useState(null);

//Funcion para inicar sesion
  const login = async(credentials) => {
    try{
      const response = await fetch("http://localhost:8000/api/login/",{
        method : "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(credentials),
      });

      if(response.ok){
        const data = await response.json();
        setUser(data.user);//Guarda el usuario en el estado global
        setToken(data.token);//Guarda el token en estado global
        localStorage.setItem("token", data.token);//Almacena token el localstorage
      }
      else{
        console.error("Error en el login");
      }
    }catch(error){
      console.error("Error en la peticion:", error);
    }
  
  };

//Funcion poara cerra sesion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token")
  };
 

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
