import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const { estaAutenticado, logout } = useAuth();

  async function sair() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          👾 Diário ET
        </span>


        <div className="navbar-nav">

          <Link className="nav-link" to="./home">
            🏠 Home
          </Link>

          {estaAutenticado && (
            <>
              <Link className="nav-link" to="/aliens">👽 Aliens</Link>
              <Link className="nav-link" to="/planetas">🪐 Planetas</Link>
              <Link className="nav-link" to="/avistamentos">👀 Avistamentos</Link>
            </>
          )}
          {
            estaAutenticado ? (
              <button className="btn" type="button" onClick={sair}>
                Sair
              </button>
            ) : (
              <>
                <Link className="" to="/login">Login</Link>
                <Link className="" to="/cadastro">Cadastro</Link>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
}