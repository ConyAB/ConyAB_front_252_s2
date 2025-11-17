import { Link } from "react-router-dom";
import '../assets/styles/navbar.css';
import logo from "../assets/imgs/logo.png"; 

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-container">
        <img src={logo} alt="Logo Monster Hunters" className="logo" />
        <h2 className="titulo">Monster Hunters</h2>
      </div>

      <ul className="menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/instrucciones">Instrucciones</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/irapartida">Cerrar sesion</Link></li>
      </ul>

    </nav>
  );
}

export default Navbar;