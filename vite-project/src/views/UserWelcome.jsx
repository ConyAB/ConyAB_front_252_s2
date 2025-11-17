import { useState } from "react"

export default function UserWelcome() {
    const [nombre, setNombre] = useState("");
    
    function handleChange(nombre) {
        setNombre(nombre);
    }

    return (
        <>
            <h2>Mi primer componente</h2>
            <input 
                onChange={e => handleChange(e.target.value)}
                value={nombre}
            />
            <p>
                Bienvenido, { nombre }!
            </p>
        </>
    );
}