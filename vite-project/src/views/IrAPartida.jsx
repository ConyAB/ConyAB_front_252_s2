import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbarsession from "../components/NavBarSession.jsx";
import "../assets/styles/irapartida.css";
import { AuthContext } from "../components/AuthContext.jsx";

function IrAPartida() {
  const navigate = useNavigate();
  const { token, userData } = useContext(AuthContext);
  useEffect(() => {
    if (!token || !userData?.id_usuario) {
      navigate("/login");
    }
  }, [token, userData, navigate])
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
