import axios from 'axios';
import "../assets/styles/registro.css";
import { useState } from 'react';
import Navbar from '../components/NavBar.jsx';
import { Link } from "react-router-dom";

function Signup() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmaContrasena, setConfirmaContrasena] = useState("");

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/autenticacion/registrar`, {
        nombre,
        apellido,
        username,
        correo,
        contrasena,
        confirmaContrasena
      })
      .then((response) => {
        console.log("Registro exitoso");
        setError(false);
        setMsg("¡Te registraste con éxito! Ya puedes iniciar sesión.");
      })
      .catch((error) => {      
        console.error("Error del servidor:", error);
        setError(true);
        setMsg(error.response?.data?.error || "Error al registrar");
      });
  };

  return (
    <>
      <Navbar />
    <div className="Login">
      <h1> Registro </h1>
      <p>¡Crea tu cuenta para empezar tu aventura!</p>
      {msg.length > 0 && (
        <div className={error ? "error" : "successMsg"}>{msg}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </label>

        <label>
          Apellido:
          <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} required />
        </label>

        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>

        <label>
          Correo:
          <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} required />
        </label>

        <label>
          Contraseña:
          <input type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} required />
        </label>

        <label>
          Confirmar contraseña:
          <input type="password" value={confirmaContrasena} onChange={e => setConfirmaContrasena(e.target.value)} required />
        </label>

        <input type="submit" value="Registrarme" />
      </form>
      </div>
      <div className="auth-buttons">
        <Link className="btn" to="/login">Iniciar sesion</Link>
        <Link className="btn" to="/">Volver</Link>
      </div>
    </>
  );
}

export default Signup;


