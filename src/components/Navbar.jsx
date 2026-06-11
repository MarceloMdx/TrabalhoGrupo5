function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          👽 Diário ET
        </span>

        <div className="navbar-nav">
          <a className="nav-link" href="#">
            Avistamentos
          </a>

          <a className="nav-link" href="#">
            Aliens
          </a>

          <a className="nav-link" href="#">
            Planetas
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;