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

function Routing() {
    return (
        <AuthProvider>
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
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Routing
