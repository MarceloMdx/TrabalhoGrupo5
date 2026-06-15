import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/apiService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [usuario, setUsuario] = useState(null);
const [token, setToken] = useState(null);
const [carregandoToken, setCarregandoToken] = useState(true);

useEffect(() => {
const tokenArmazenado = localStorage.getItem("token");
const usuarioArmazenado = localStorage.getItem("usuario");

    if (tokenArmazenado && usuarioArmazenado) {
    setToken(tokenArmazenado);
    setUsuario(JSON.parse(usuarioArmazenado));
    }

    setCarregandoToken(false);
}, []);

async function login(credenciais) {
const resposta = await api.login(credenciais.email, credenciais.senha);

const novoToken = resposta.token || resposta.access_token;
setToken(novoToken);
setUsuario(resposta.usuario || { email: credenciais.email });

localStorage.setItem("token", novoToken);
localStorage.setItem("usuario", JSON.stringify(resposta.usuario || { email: credenciais.email }));
}

function logout() {
setToken(null);
setUsuario(null);
localStorage.removeItem("token");
localStorage.removeItem("usuario");
}

return (
    <AuthContext.Provider
    value={{
        usuario,
        token,
        login,
        logout,
        estaAutenticado: !!token,
        carregandoToken,
    }}
    >
    {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
const contexto = useContext(AuthContext);

if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
}

return contexto;
}
