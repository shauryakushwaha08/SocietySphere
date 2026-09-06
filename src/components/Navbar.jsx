import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import "./Navbar.css";

function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/societies">Societies</Link>
        <Link to="/applications">Applications</Link>
      </div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}

export default Navbar;