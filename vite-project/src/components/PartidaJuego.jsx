import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./NavBarPartida";
import { AuthContext } from "../components/AuthContext";

import "../assets/styles/partidajuego.css";

import JugadorPanel from "../views/JugadorPanel";
import MonstruoPanel from "../views/MonstruoPanel";
import AccionesPanel from "../views/AccionesPanel";

function PartidaJuego() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, userData } = useContext(AuthContext);

    const [partida, setPartida] = useState(null);
    const [miJugador, setMiJugador] = useState(null);
    const [jugadores, setJugadores] = useState([]);
    const [monstruo, setMonstruo] = useState(null);
    const [log, setLog] = useState([]);
    const [misCartas, setMisCartas] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    const [mostrarCartas, setMostrarCartas] = useState(false);
    const [mostrarTienda, setMostrarTienda] = useState(false);


    useEffect(() => {
        if (!token || !userData?.id_usuario) {
            navigate("/login");
        }
    }, [token, userData?.id_usuario, navigate]);


    const cargarEstado = async () => {
        try {
            if (!token) return;

            const resPartida = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/partidas/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const p = resPartida.data;
            setPartida(p);
            setJugadores(p.jugadores || []);

            const yo = p.jugadores?.find(j => j.id_usuario === userData.id_usuario);
            setMiJugador(yo || null);

            const resMonstruos = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/monstruos/partida/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const monstruos = resMonstruos.data || [];
            const activo = monstruos.find(m => m.vivo) || monstruos[0] || null;
            setMonstruo(activo);

            setCargando(false);

        } catch (err) {
            setError(err.response?.data?.error || "Error al cargar la partida.");
            setCargando(false);
        }
    };


    const cargarMisCartas = async () => {
        try {
            if (!miJugador) return;

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/cartasjugador/${miJugador.id_jugador_partida}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMisCartas(res.data);

        } catch (err) {
            console.error("Error cargando cartas:", err);
        }
    };

    useEffect(() => {
        if (miJugador && token) cargarMisCartas();
    }, [miJugador, token]);


    useEffect(() => {
        if (!token || !userData?.id_usuario) return;

        cargarEstado();
        const intervalo = setInterval(cargarEstado, 3500);

        return () => clearInterval(intervalo);
    }, [token, userData?.id_usuario, id]);

 
    const atacarBasico = async () => {
        if (!miJugador || !monstruo || !partida) return;

        try {
            const ataqueJugador = Number(miJugador.ataque) || 0;
            const vidaMonstruo = Number(monstruo.vida) || 0;

            const dañoJugador = 2 + ataqueJugador;
            let nuevaVida = vidaMonstruo - dañoJugador;

            if (isNaN(nuevaVida)) nuevaVida = vidaMonstruo;
            if (nuevaVida < 0) nuevaVida = 0;

            const nuevoLog = [`Atacaste e hiciste ${dañoJugador} de daño.`];

            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/monstruos/${monstruo.id_monstruo}`,
                { vida: nuevaVida },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (nuevaVida <= 0) {
                nuevoLog.push("¡Monstruo derrotado!");

                await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/monstruos/${monstruo.id_monstruo}`,
                    { vivo: false, vida: 0 },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/monstruos/crear`,
                    { id_partida: partida.id_partida, dificultad: partida.dificultad },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setLog(prev => [...prev, ...nuevoLog]);
                await cargarEstado();
                return;
            }

            const dañoMonstruo = Math.max(
                Number(monstruo.ataque) - Number(miJugador.defensa),
                1
            );

            const nuevaVidaJugador = miJugador.vida - dañoMonstruo;

            nuevoLog.push(`El monstruo te hizo ${dañoMonstruo} de daño.`);

            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/jugadorespartida/${miJugador.id_jugador_partida}`,
                { vida: nuevaVidaJugador },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (nuevaVidaJugador <= 0) nuevoLog.push("Has muerto");

            setLog(prev => [...prev, ...nuevoLog]);
            await cargarEstado();

        } catch (err) {
            setError(err.response?.data?.error || "Error ejecutando ataque.");
        }
    };


    if (cargando) {
        return (
            <>
                <Navbar />
                <div className="mensaje-cargando">Cargando partida...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="mensaje-error">{error}</div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="juego-layout">
                <JugadorPanel
                    jugador={miJugador}
                    username={userData.username}
                    jugadores={jugadores}
                    cartas={misCartas}
                />

                {monstruo ? (
                    <MonstruoPanel monstruo={monstruo} />
                ) : (
                    <div className="no-monstruo-msg">
                        <h3>No hay monstruo generado aún...</h3>
                        <p>El host debe generar el primer monstruo.</p>
                    </div>
                )}

                <AccionesPanel
                    onAtaqueBasico={atacarBasico}
                    onMostrarCartas={() => setMostrarCartas(true)}
                    onAbrirTienda={() => setMostrarTienda(true)}
                />
            </div>
        </>
    );
}

export default PartidaJuego;
