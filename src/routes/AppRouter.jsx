import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Aliens from "../pages/Aliens/index";
import Cadastro from "../pages/Cadastros/index";
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import Planetas from "../pages/Planetas/index";
import Avistamentos from "../pages/Avistamentos/index";

function RotaPrivada({ children }) {
        const { carregandoToken, estaAutenticado } = useAuth();

        if (carregandoToken) {
            return <p>Carregando...</p>;
        }

        if (!estaAutenticado) {
            return <Navigate to="/login" replace />;
        }

        return children;
    }

export default function AppRouter() {

    

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />

            <Route
                path="/avistamentos"
                element={
                    <RotaPrivada>
                        <Avistamentos />
                    </RotaPrivada>} />
            <Route
                path="/aliens"
                element={
                    <RotaPrivada>
                        <Aliens />
                    </RotaPrivada>
                }
            />
            <Route
                path="/planetas"
                element={
                    <RotaPrivada>
                        <Planetas />
                    </RotaPrivada>
                }
            />
        </Routes>
    );
}
