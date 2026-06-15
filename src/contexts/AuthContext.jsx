import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    const armazenado = localStorage.getItem("usuarioAutenticado");
    const nome = localStorage.getItem("nomeUsuario");

    if (armazenado === "true") {
      setEstaAutenticado(true);
      setNomeUsuario(nome || "Visitante");
    }
    setCarregandoToken(false);
  }, []);

  async function login({ email, senha }) {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios.");
    }

    localStorage.setItem("usuarioAutenticado", "true");
    localStorage.setItem("nomeUsuario", email.split("@")[0] || "Visitante");
    setNomeUsuario(email.split("@")[0] || "Visitante");
    setEstaAutenticado(true);
  }

  function logout() {
    localStorage.removeItem("usuarioAutenticado");
    localStorage.removeItem("nomeUsuario");
    setEstaAutenticado(false);
    setNomeUsuario("");
  }

  return (
    <AuthContext.Provider
      value={{ estaAutenticado, nomeUsuario, carregandoToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
