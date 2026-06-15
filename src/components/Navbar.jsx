import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { estaAutenticado, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          👾 Diário ET
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {estaAutenticado && (
              <>
                <Link className="nav-link" to="/">
                  Home
                </Link>

                <Link className="nav-link" to="/avistamentos">
                  Avistamentos
                </Link>

                <Link className="nav-link" to="/aliens">
                  Aliens
                </Link>

                <Link className="nav-link" to="/planetas">
                  Planetas
                </Link>

                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Sair
                </button>
              </>
            )}
            {!estaAutenticado && (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;