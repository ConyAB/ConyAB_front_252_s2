import Navbar from '../components/NavBar.jsx';
import "../assets/styles/inicio.css";
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <>
      <Navbar />

      <div className="inicio-container">

        <div className="inicio-header">
          <h1>Multiples cazadores, un solo ganador</h1>
          <p>
            El juego donde deberás cazar monstruos, comprar cartas,
            subir de nivel y competir por ser el mejor cazador.
          </p>

          <div className="auth-buttons">
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn" to="/signup">Registro</Link>
          </div>
        </div>

        <div className="descriptions-row">
          <div className="description">
            <h3>Construye tu mazo</h3>
            <p>Consigue cartas únicas como recompensa o comprándolas en la tienda.</p>
          </div>

          <div className="description">
            <h3>Estados de combate</h3>
            <p>Aplica estados como Furia, Coraza, Rapidez y más para obtener ventajas sobre tus rivales.</p>
          </div>

          <div className="description">
            <h3>Estrategia</h3>
            <p>Decide sabiamente cuándo utilizar tus recursos para convertirte en el mejor cazador.</p>
          </div>
        </div>

        <div className="reglas-boton">
          <Link className="btn" to="/instrucciones">Descubre las reglas</Link>
        </div>

      </div>
    </>
  );
}

export default Inicio;
