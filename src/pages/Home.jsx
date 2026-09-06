import { Link } from "react-router-dom";
import societies from "../data/societies";
import "./Home.css";

function Home() {
  const totalSocieties = societies.length;
  const categories = [...new Set(societies.map((s) => s.category))];
  const totalRoles = societies.reduce((sum, s) => sum + s.roles.length, 0);

  return (
    <div className="home-hero">
      <h1>
        Find your community.
        <br />
        Shape your campus.
      </h1>
      <p className="hero-sub">
        Browse every recognized society on campus, see what they're recruiting
        for, and apply in minutes.
      </p>
      <Link to="/societies" className="hero-cta">
        Browse Societies
      </Link>

      <div className="stats-row">
        <div className="stat">
          <span className="stat-number">{totalSocieties}</span>
          <span className="stat-label">Societies</span>
        </div>
        <div className="stat">
          <span className="stat-number">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalRoles}</span>
          <span className="stat-label">Open Roles</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
