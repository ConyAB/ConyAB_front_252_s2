import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/styles/crearpartida.css";
import { AuthContext } from "./AuthContext";

function CrearPartida() {
  const navigate = useNavigate();
  const { token, userData } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [maxJugadores, setMaxJugadores] = useState(2);
  const [dificultad, setDificultad] = useState("facil");
  const [monstruos, setMonstruos] = useState(1);
  const [turnosMaximos, setTurnosMaximos] = useState(10);
  const [privada, setPrivada] = useState(false);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token || !userData?.id_usuario) {
      navigate("/login");
    }
  }, [token, userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/partidas`,
        {
          nombre,
          maxJugadores,
          dificultad,
          monstruos,
          turnosMaximos,
          privada,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setError(false);
      setMsg("Partida creada correctamente");
      navigate(`/lobbypartida/${response.data.partida.id_partida}`);
    } catch (err) {
      console.error(err);
      setError(true);
      setMsg(err.response?.data?.error || "Error al crear la partida");
    }
  };

  return (
    <>
      <Navbar />

      <div className="crear-container">
        <h1>Crea tu propia partida</h1>

        {msg && (
          <div className={error ? "error" : "successMsg"}>
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="crear-form">

          <label>
            Nombre de la partida:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>

          <label>
            Máximo de jugadores (2–4):
            <select
              value={maxJugadores}
              onChange={(e) => setMaxJugadores(Number(e.target.value))}
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>

          <label>
            Dificultad:
            <select
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
            >
              <option value="facil">Fácil</option>
              <option value="intermedio">Intermedio</option>
              <option value="dificil">Difícil</option>
            </select>
          </label>

          <label>
            Cantidad de monstruos:
            <input
              type="number"
              min="1"
              value={monstruos}
              onChange={(e) => setMonstruos(Number(e.target.value))}
              required
            />
          </label>

          <label>
            Número de turnos máximos:
            <input
              type="number"
              min="1"
              value={turnosMaximos}
              onChange={(e) => setTurnosMaximos(Number(e.target.value))}
              required
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={privada}
              onChange={(e) => setPrivada(e.target.checked)}
            />
            Partida privada
          </label>

          <button type="submit" className="btn-crear">
            Crear partida
          </button>

          <div className="botones-dos">
            <Link className="btn" to="/">Volver a página principal</Link>
            <Link className="btn" to="/buscarpartida">Buscar partida</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default CrearPartida;

