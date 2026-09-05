import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/societies">Societies</Link>
      <Link to="/applications">Applications</Link>
    </nav>
  );
}

export default Navbar;
