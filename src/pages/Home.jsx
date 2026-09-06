import { ArrowRight, Compass, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import societies from "../data/societies";
import "./Home.css";

function Home() {
  const totalSocieties = societies.length;
  const categories = [...new Set(societies.map((s) => s.category))];
  const totalRoles = societies.reduce((sum, s) => sum + s.roles.length, 0);

  return (
    <div className="home-hero">
      <div className="hero-kicker"><span className="kicker-dot" /> CAMPUS, CONNECTED</div>
      <h1>Find the room where <em>your</em> ideas get louder.</h1>
      <p className="hero-sub">
        Browse recognized societies, discover your next people, and put your
        name forward in minutes.
      </p>
      <Link to="/societies" className="hero-cta">
        Explore societies <ArrowRight size={18} />
      </Link>

      <div className="stats-row">
        <div className="stat">
          <Compass size={20} />
          <span className="stat-number">{totalSocieties}</span>
          <span className="stat-label">Societies</span>
        </div>
        <div className="stat">
          <Users size={20} />
          <span className="stat-number">{categories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
        <div className="stat">
          <Sparkles size={20} />
          <span className="stat-number">{totalRoles}</span>
          <span className="stat-label">Open Roles</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
