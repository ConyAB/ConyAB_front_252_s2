import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../assets/styles/buscarpartida.css";

function BuscarPartida() {
    const [partidas, setPartidas] = useState([]);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const cargarPartidas = async () => {
        try {
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/disponibles`
        );
        setPartidas(res.data);
        } catch (err) {
        setError("Error al cargar partidas");
        }
    };

    useEffect(() => {
        cargarPartidas();
    }, []);

    const unirsePartida = async (idPartida) => {
        try {
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/unirse/${idPartida}`,
            {},
            {
            headers: {
                "x-user-id": userId,
                Authorization: `Bearer ${token}`,
            },
            }
        );

        navigate(`/lobbypartida/${idPartida}`);

        } catch (err) {
        alert(err.response?.data?.error || "No se pudo unir a la partida");
        }
    };

    return (
        <>
        <Navbar />

        <div className="buscar-container">
            <h1>Partidas disponibles</h1>
            <p className="subtitulo">Unete a una partida</p>

            {error && <p className="error">{error}</p>}

            <div className="lista-partidas">

            {partidas.length === 0 && (
                <p className="no-partidas">No hay partidas disponibles por ahora</p>
            )}

            {partidas.map((p) => (
                <div className="partida-card" key={p.id_partida}>
                <h2>{p.nombre}</h2>

                <p><strong>Dificultad:</strong> {p.dificultad}</p>
                <p>
                    <strong>Jugadores:</strong> {p.jugadores.length} / {p.max_jugadores}
                </p>

                <button
                    className="btn-unirse"
                    onClick={() => unirsePartida(p.id_partida)}
                >
                    Unirse
                </button>
                </div>
            ))}

            </div>
        </div>
        </>
    );
}

export default BuscarPartida;
