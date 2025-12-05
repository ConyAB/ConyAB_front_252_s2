import { Link } from "react-router-dom";
import '../assets/styles/navbar.css';
import logo from "../assets/imgs/logo.png"; 
import LogoutButton from "./Logout";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo-container">
        <img src={logo} alt="Logo Monster Hunters" className="logo" />
        <h2 className="titulo">Monster Hunters</h2>
      </div>

      <ul className="menu">
        <li><Link to="/irapartida">Salir partida</Link></li>
        <LogoutButton></LogoutButton>
      </ul>

    </nav>
  );
}

export default Navbar;