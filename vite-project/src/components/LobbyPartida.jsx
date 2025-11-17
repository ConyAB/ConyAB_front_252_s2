import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/styles/lobbypartida.css";

function LobbyPartida() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [partida, setPartida] = useState(null);
    const [tiempo, setTiempo] = useState(90);
    const [error, setError] = useState("");

    const [hostName, setHostName] = useState("");  
    const [jugadoresNombres, setJugadoresNombres] = useState({});

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const [tiempoTerminado, setTiempoTerminado] = useState(false);

    const cargarPartida = async () => {
        try {
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/${id}`
        );
        setPartida(res.data);
        } catch (err) {
        setError("Error cargando la partida");
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
            .get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${partida.id_host}`)
            .then((res) => {
            setHostName(res.data.username); 
            })
            .catch(() => {
            setHostName("Host desconocido");
            });
        }
    }, [partida]);

    useEffect(() => {
        if (partida?.jugadores?.length > 0) {
        partida.jugadores.forEach((j) => {
            axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/usuarios/${j.id_usuario}`)
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
        if (tiempo <= 0) {
            setTiempoTerminado(true);
            setTimeout(() => {navigate("/");}, 3000);
            return;
        }

        const timer = setTimeout(() => {
        setTiempo((t) => t - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [tiempo]);

    const iniciarPartida = async () => {
        try {
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/iniciar/${id}`,
            {},
            {
            headers: {
                "x-user-id": userId,
                Authorization: `Bearer ${token}`,
            },
            }
        );

        navigate(`/partida/${id}/juego`);
        } catch (err) {
        setError(err.response?.data?.error || "Error al iniciar partida");
        }
    };

    if (!partida) return <p>Cargando partida...</p>;

    const esHost = partida.id_host == userId;
    const jugadores = partida.jugadores || [];

    return (
        <>
        <Navbar />

        <div className="lobby-container">
            <h1>Lobby de la partida: {partida.nombre}</h1>

            <div className="config-box">
            <p><strong>Dificultad:</strong> {partida.dificultad}</p>
            <p><strong>Jugadores máximos:</strong> {partida.max_jugadores}</p>
            <p><strong>Monstruos:</strong> {partida.monstruos}</p>
            <p><strong>Turnos máximos:</strong> {partida.turnosMaximos}</p>
            <p><strong>Host:</strong> {hostName}</p>
            </div>

            <h2>Jugadores conectados:</h2>

            <ul className="jugadores-lista">
            {jugadores.map((j) => (
                <li key={j.id_usuario}>
                {jugadoresNombres[j.id_usuario]}
                </li>
            ))}
            </ul>

            <h3>Tiempo restante: {tiempo}s</h3>

            {error && <p className="error">{error}</p>}

            {esHost && jugadores.length >= 2 && (
            <button className="btn-iniciar" onClick={iniciarPartida}>
                Iniciar partida
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


