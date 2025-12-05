import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/styles/lobbypartida.css";
import { AuthContext } from "../components/AuthContext";

function LobbyPartida() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { userData, token } = useContext(AuthContext);
    const userId = userData?.id_usuario;

    const [partida, setPartida] = useState(null);
    const [tiempo, setTiempo] = useState(90);

    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [loading, setLoading] = useState(false);

    const [hostName, setHostName] = useState("");
    const [jugadoresNombres, setJugadoresNombres] = useState({});


    const cargarPartida = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPartida(res.data);
            setError("");
        } catch (err) {
            if (err.response?.status === 401) {
                setError("Tu sesión expiró. Inicia sesión nuevamente.");
                navigate("/login");
                return;
            }
            setError("Error cargando la partida.");
        }
    };

    useEffect(() => {
        cargarPartida();
        const intervalo = setInterval(cargarPartida, 3000);
        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        if (partida?.id_host) {
        axios
            .get(
            `${import.meta.env.VITE_BACKEND_URL}/usuarios/${partida.id_host}`,
            { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => setHostName(res.data.username))
            .catch(() => setHostName("Host desconocido"));
        }
    }, [partida, token]);


    useEffect(() => {
        if (partida?.jugadores?.length > 0) {
        partida.jugadores.forEach((j) => {
            axios
            .get(
                `${import.meta.env.VITE_BACKEND_URL}/usuarios/${j.id_usuario}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                setJugadoresNombres((prev) => ({
                ...prev,
                [j.id_usuario]: res.data.username,
                }));
            })
            .catch(() => {
                setJugadoresNombres((prev) => ({
                ...prev,
                [j.id_usuario]: "Jugador desconocido",
                }));
            });
        });
        }
    }, [partida]);


    useEffect(() => {
        if (partida?.estado === "en curso") {
        navigate(`/partida/${id}/juego`);
        }
    }, [partida, id, navigate]);


    const iniciarPartida = async () => {
        try {
        setLoading(true);
        setMensaje("");

        const resInicio = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/iniciar/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const resPartida = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const dificultad = resPartida.data.dificultad;

        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/monstruos/crear`,
            { id_partida: id, dificultad },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        navigate(`/partida/${id}/juego`);

        } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "No se pudo iniciar la partida.");
        } finally {
        setLoading(false);
        }
    };


    if (!partida) return <p className="loading">Cargando partida...</p>;

    const esHost = partida.id_host === userId;
    const jugadores = partida.jugadores || [];

    return (
        <>
        <Navbar />

        <div className="lobby-container">

            {error && <p className="mensaje-error">{error}</p>}
            {mensaje && <p className="mensaje-ok">{mensaje}</p>}

            <h1>Partida: {partida.nombre} (Host: {hostName})</h1>

            <h2>Jugadores conectados:</h2>
            <ul className="jugadores-lista">
            {jugadores.map((j) => (
                <li key={j.id_usuario}>{jugadoresNombres[j.id_usuario]}</li>
            ))}
            </ul>

            <div className="config-box">
            <p><strong>Modo:</strong> {partida.dificultad}</p>
            <p><strong>Jugadores máximos:</strong> {partida.max_jugadores}</p>
            <p><strong>Monstruos:</strong> {partida.monstruos}</p>
            <p><strong>Turnos máximos:</strong> {partida.turnosMaximos}</p>
            </div>

            {esHost && jugadores.length >= 2 && (
            <button
                className="btn-iniciar"
                onClick={iniciarPartida}
                disabled={loading}
            >
                {loading ? "Iniciando..." : "Iniciar partida"}
            </button>
            )}

            {esHost && jugadores.length < 2 && (
            <p className="aviso-min">Necesitas al menos 2 jugadores para iniciar</p>
            )}
        </div>
        </>
    );
}

export default LobbyPartida;
