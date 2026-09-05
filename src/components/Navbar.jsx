import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/societies">Societies</Link>
      <Link to="/applications">Applications</Link>
    </nav>
  );
}

export default Navbar;
