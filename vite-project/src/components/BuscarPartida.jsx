import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../assets/styles/buscarpartida.css";
import { AuthContext } from "../components/AuthContext"; 

function BuscarPartida() {
    const navigate = useNavigate();
    const { token, userData } = useContext(AuthContext);

    const [partidas, setPartidas] = useState([]);
    const [error, setError] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");

    useEffect(() => {
        if (!token || !userData?.id_usuario) {
        navigate("/login");
        }
    }, [token, userData, navigate]);

    const cargarPartidas = async () => {
        try {
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/disponibles`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setPartidas(res.data);
        setError("");
        } catch (err) {
            setError("Error al cargar partidas");
            setMensaje("No se logro obtener las partidas, intenta nuevamente");
            setTipoMensaje("error");

        }
    };

    useEffect(() => {
        if (token && userData?.id_usuario) {
        cargarPartidas();
        }
    }, [token, userData?.id_usuario]);

    const misPartidas = partidas.filter(
        (p) => p.id_host === userData?.id_usuario
    );

    const partidasUnidas = partidas.filter(
        (p) =>
        p.id_host !== userData?.id_usuario &&
        p.jugadores.some(j => j.id_usuario === userData?.id_usuario)
    );

    const otrasPartidas = partidas.filter(
        (p) =>
        p.id_host !== userData?.id_usuario &&
        !p.jugadores.some(j => j.id_usuario === userData?.id_usuario)
    );

    const unirsePublica = async (idPartida) => {
        try {
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/unirse/${idPartida}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setTipoMensaje("succes");
        setMensaje("Te uniste a la partida ¡Comienza la aventura!");
        navigate(`/lobbypartida/${idPartida}`);
        } catch (err) {
            const msg = err.response?.data?.error;
            if (err.response?.status === 401) {
                setTipoMensaje("error");
                setMensaje("Tu sesión expiró. Inicia sesión nuevamente 🔐");
                navigate("/login");
                return;
            }
            setTipoMensaje("error");
            setMensaje(msg || "No pudiste unirte a la partida.");
        }
    };

    const solicitarPrivada = async (idPartida) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/solicitar/${idPartida}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTipoMensaje("success");
            setMensaje("Solicitud enviada al host. Espera su aprobación");
        } catch (err) {
            const msg = err.response?.data?.error;
            if (err.response?.status === 401) {
                setTipoMensaje("error");
                setMensaje("Tu sesión expiró. Inicia sesión nuevamente 🔐");
                navigate("/login");
                return;
            }

            setTipoMensaje("error");
            setMensaje(msg || "No se pudo enviar la solicitud.");
        }
    };

    return (
        <>
        <Navbar />

        <div className="buscar-container">
            {mensaje && (<p className={`mensaje-global ${tipoMensaje}`}>{mensaje}</p>)}
            <h1>Mis Partidas Creadas</h1>
            {misPartidas.length === 0 && <p className="no-partidas">Aún no has creado partidas.</p>}

            <div className="lista-partidas">
            {misPartidas.map((p) => (
                <div className="partida-card propia" key={p.id_partida}>
                <h2>{p.nombre} (Eres Host)</h2>

                <p><strong>Dificultad:</strong> {p.dificultad}</p>
                <p><strong>Jugadores:</strong> {p.jugadores.length} / {p.max_jugadores}</p>

                <button className="btn-unirse" onClick={() => navigate(`/lobbypartida/${p.id_partida}`)}>
                    Ir al Lobby
                </button>
                </div>
            ))}
            </div>

            <h1>Partidas en las que estoy jugando</h1>
            {partidasUnidas.length === 0 && <p className="no-partidas">No te has unido a ninguna partida aún.</p>}

            <div className="lista-partidas">
            {partidasUnidas.map((p) => (
                <div className="partida-card unida" key={p.id_partida}>
                <h2>{p.nombre}</h2>

                <p><strong>Dificultad:</strong> {p.dificultad}</p>
                <p><strong>Jugadores:</strong> {p.jugadores.length} / {p.max_jugadores}</p>
                <p><strong>Host:</strong> {p.host?.username || "Host desconocido"}</p>

                <button className="btn-unirse" onClick={() => navigate(`/lobbypartida/${p.id_partida}`)}>
                    Ir al Lobby
                </button>
                </div>
            ))}
            </div>

            <h1>Partidas Disponibles</h1>
            {error && <p className="error">{error}</p>}

            <div className="lista-partidas">
            {otrasPartidas.length === 0 && <p className="no-partidas">No hay partidas disponibles.</p>}

            {otrasPartidas.map((p) => (
                <div className="partida-card" key={p.id_partida}>
                <h2>{p.nombre}</h2>
                <p><strong>Dificultad:</strong> {p.dificultad}</p>
                <p><strong>Jugadores:</strong> {p.jugadores.length} / {p.max_jugadores}</p>
                <p><strong>Privacidad:</strong> {p.privada ? "Privada" : "Pública"}</p>

                {p.privada ? (
                    <button className="btn-unirse privada" onClick={() => solicitarPrivada(p.id_partida)}>
                    Solicitar acceso
                    </button>
                ) : (
                    <button className="btn-unirse" onClick={() => unirsePublica(p.id_partida)}>
                    Unirse
                    </button>
                )}
                </div>
            ))}
            </div>

        </div>
        </>
    );
}

export default BuscarPartida;

