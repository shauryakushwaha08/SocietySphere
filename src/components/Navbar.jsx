import { Link, NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import "./Navbar.css";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/" className="brand" aria-label="SocietySphere home">
        <span className="brand-mark">S</span>
        <span>Society<span>Sphere</span></span>
      </Link>
      <div className="nav-actions">
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/societies">Societies</NavLink>
          <NavLink to="/applications">Applications</NavLink>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;