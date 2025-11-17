import { useEffect , useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData, setUserData] = useState({
      id_usuario: localStorage.getItem('id_usuario'),
      username: localStorage.getItem('username')
    });

    function logout() {
        setToken(null);
        setUserData(null);
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("username");
    }

    useEffect(() => {
        if (token) localStorage.setItem('token', token);
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, userData, setUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;
