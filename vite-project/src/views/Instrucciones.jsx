import "../assets/styles/instrucciones.css";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

function Instrucciones() {
  return (
    <div>
    <Navbar />
    <div className="instrucciones-container">
      <h1>Instrucciones</h1>

      <p>
        <strong>Monster Hunters</strong> es un juego cooperativo-competitivo por turnos donde entre
        <strong> 2 y 4 jugadores</strong> se enfrentan a monstruos para conseguir experiencia,
        oro y cartas. Aunque colaboran para sobrevivir, también compiten por ser el
        cazador con más experiencia al final.
      </p>
      <div className="instruccion1-container">
      <h2>¿Cómo puedo comenzar a jugar?</h2>

      <p>Después de haber iniciado sesión, tienes dos opciones para comenzar una partida:</p>
        <h3>1. Crear una partida</h3>
        <p>
          Al crear una partida debes definir:
        </p>
        <ul>
          <li>El nivel de dificultad (fácil, intermedio o difícil)</li>
          <li>Si la partida será pública o privada</li>
          <li>La cantidad máxima de jugadores (entre 2 y 4)</li>
        </ul>
        <p>
          Una vez que la partida es creada, quedas asignado automáticamente como
          <strong> host</strong> y podrás comenzar cuando todos los jugadores se unan
          o existan al menos 2 participantes.
        </p>
      <h3>2. Unirse a una partida publica</h3>
      <p>Para unirte a una partida, debes cumplir con lo siguiente:</p>
      <ul>
        <li>No debe estar llena</li>
        <li>No debe haber comenzado aún</li>
      </ul>
      <p>Si la partida es publica y cumples con los requisitos anteriores, puedes llegar y unirte
        si es privada, debes solicitar unirte
      </p>
      </div>

      <div className="instruccion2-container">
      <h2>¿Cuál es el objetivo?</h2>
      <p>
        Derrotar monstruos, sobrevivir a sus ataques, obtener oro, cartas y experiencia,
        y al final del juego ser el jugador con mayor puntuación
      </p>
      </div>
      <div className="instruccion2-container">
      <h2>¿Cómo se juega?</h2>
      <ul>
        <li>El juego avanza por turnos, uno por jugador</li>
        <li>Cada turno puedes realizar una acción: ataque básico, ataque especial, usar una carta o comprar en tienda</li>
        <li>Cuando todos juegan, el monstruo ataca automáticamente</li>
        <li>Al derrotar un monstruo comienza una fase de comercio entre jugadores</li>
        <li>Luego aparece un nuevo monstruo y la partida continúa</li>
      </ul>
      </div>
      <div className="instruccion2-container">
      <h2>¿Cómo se gana?</h2>
      <p>
        Al finalizar la partida, gana el jugador con <strong>más experiencia acumulada</strong> o el último jugador vivo.
      </p>
      </div>
    <div className="botones">
          <Link className="btn" to="/">Volver a pagina principal</Link>
    </div>
    </div>
    </div>
    
  );
}

export default Instrucciones;
