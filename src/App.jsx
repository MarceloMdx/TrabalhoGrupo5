<<<<<<< HEAD
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import ErrorMessage from "./components/ErrorMessage";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="container-page">
        <h1>👽 Diário de Avistamentos ET</h1>
      </div>
      <ErrorMessage />
        </>
  );
}

export default App;
=======
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
>>>>>>> 95573e7b42f2d74cd7d24746250ea2d6e691ddeb
