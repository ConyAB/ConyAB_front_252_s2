import Navbarsession from "../components/NavBarSession.jsx";
import "../assets/styles/irapartida.css";
import { Link } from "react-router-dom";

function IrAPartida() {
  return (
    <div>
      <Navbarsession />

      <div className="partida-container">
        <h1>Juega ya</h1>

        <p>Crea o busca una partida</p>

        <div className="partida-botones">
          <Link to="/crearpartida" className="btn-partida crear">
            Crear partida
          </Link>

          <Link to="/buscarpartida" className="btn-partida buscar">
            Buscar partida
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IrAPartida;
