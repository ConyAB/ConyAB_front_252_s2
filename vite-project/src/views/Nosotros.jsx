import "../assets/styles/nosotros.css";
import Navbar from '../components/NavBar.jsx';

function Nosotros() {
  return (
    <div>
        <Navbar />
    <div className="page">
      <h1>Sobre Nosotros</h1>
      <p>
        Hola, soy Constanza Azua, mente creadora detras de este juego. 
        Mi enfoque esta en construir una experiencia divertida y desafiante.
      </p>

      <h2>Equipo</h2>
      <ul>
        <li>Constanza (ConyAB) — Fullstack Developer y Diseñadora del Juego</li>
      </ul>
    </div>
    </div>
  );
}

export default Nosotros;
