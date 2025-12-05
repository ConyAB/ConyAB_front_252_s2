import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './views/Inicio'
import Instrucciones from './views/Instrucciones'
import Nosotros from './views/Nosotros'
import Signup from './components/Signup'
import Login from './components/Login'
import AuthProvider from './components/AuthProvider'
import IrAPartida from './views/IrAPartida'
import CrearPartida from './components/CrearPartida'
import LobbyPartida from './components/LobbyPartida'
import BuscarPartida from './components/BuscarPartida'
import AdminCheck from './components/AdminCheck'
import UserCheck from './components/UserCheck'
import LogoutButton from './components/Logout'
import PartidaJuego from './components/PartidaJuego'

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/instrucciones' element={<Instrucciones/>}/>
                <Route path='/nosotros' element={<Nosotros/>}/>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/irapartida' element={<IrAPartida/>} />
                <Route path='/crearpartida' element={<CrearPartida/>} />
                <Route path='/lobbypartida/:id' element={<LobbyPartida/>} />
                <Route path='/buscarpartida' element={<BuscarPartida/>} />
                <Route path='/admincheck' element={<AdminCheck/>} />
                <Route path='/usercheck' element={<UserCheck/>} />
                <Route path='/partida/:id/juego' element={<PartidaJuego/>} />
                <Route path='/logout' element={<LogoutButton/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routing
