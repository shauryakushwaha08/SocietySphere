import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categoryColors } from "../utils/categoryStyles";
import "./SocietyCard.css";

function SocietyCard({ society, index }) {
  const color = categoryColors[society.category];

  return (
    <Link
      to={`/society/${society.id}`}
      className="society-row"
      style={{ borderLeftColor: color }}
    >
      <span className="society-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="logo-chip">
        <img src={society.logo} alt={`${society.name} logo`} />
      </div>
      <div className="society-info">
        <div className="society-title-row">
          <h3>{society.name}</h3>
          <ArrowUpRight className="card-arrow" size={18} />
        </div>
        <p className="tagline">{society.tagline}</p>
      </div>
      <div className="society-side-meta">
        <span className="category-label" style={{ color }}>{society.category}</span>
        <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
          <span className="status-dot" /> {society.recruitmentOpen ? "Recruiting" : "Closed"}
        </span>
      </div>
    </Link>
  );
}

export default SocietyCard;
