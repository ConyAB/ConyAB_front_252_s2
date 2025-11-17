import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import "../assets/styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/NavBar.jsx';

function Login() {
  const { setToken, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/autenticacion/login`, {
      correo,
      contrasena
    })
    .then((response) => {
      const token = response.data.access_token;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", response.data.id_usuario);
      localStorage.setItem("username", response.data.username);

      setToken(token);
      setUserData({
        id_usuario: response.data.id_usuario,
        username: response.data.username
      });

      setError(false);
      navigate("/irapartida");
    })
    .catch((error) => {
      setError(true);
      setMsg(error.response?.data?.error || "Error al iniciar sesión");
    });
  };

  return (
    <>
      <Navbar />

      <div className="login-page">
        <h1>Iniciar sesión</h1>
        <p className="login-subtitle">
          ¡Ingresa a tu cuenta para empezar tu aventura!
        </p>

        <div className="Login">
          {msg.length > 0 && (
            <div className={error ? "error" : "successMsg"}>{msg}</div>
          )}

          <form onSubmit={handleSubmit}>
            <label>
              Correo:
              <input 
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </label>

            <label>
              Contraseña:
              <input 
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                required
              />
            </label>

            <input type="submit" value="Iniciar sesión"/>
          </form>
        </div>

        <div className="login-bottom-buttons">
          <Link className="btn" to="/signup">Registrarse</Link>
          <Link className="btn" to="/">Volver</Link>
        </div>
      </div>
    </>
  );
}

export default Login;

