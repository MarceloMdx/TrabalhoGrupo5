import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          👽 Diário ET
        </span>

        <div className="navbar-nav">
          <Link className="nav-link" to="./FormAvistamento.jsx">
            Avistamentos
          </Link>

          <Link className="nav-link" to="./FormAlien.jsx">
            Aliens
          </Link>

          <Link className="nav-link" to="./FormPlaneta.jsx">
            Planetas
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;