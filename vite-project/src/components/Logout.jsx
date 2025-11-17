import React, { useContext, useState } from 'react';
import "../assets/styles/inicio.css";
import { AuthContext } from './AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    logout();
    setMsg("Has cerrado sesión exitosamente.");
  };

  return (
    <>
      {msg.length > 0 && <div className="successMsg">{msg}</div>}
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </>
  );
};

export default LogoutButton;
