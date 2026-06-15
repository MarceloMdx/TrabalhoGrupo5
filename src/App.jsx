import { Link, useNavigate } from "react-router";
import { useAuth } from "../src/contexts/AuthContext";
import AppRouter from "../src/routes/AppRouter";
import Navbar from "./components/Navbar";

export default function App() {
  const navigate = useNavigate();
  const { estaAutenticado, logout } = useAuth();

  async function sair() {
    await logout();
    navigate("/login");
  }

  return (
    <main className="app">
      
      <Navbar/>
      <AppRouter />
    </main>
  );
}
