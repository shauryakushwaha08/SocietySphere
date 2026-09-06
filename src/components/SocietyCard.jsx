import { Link } from "react-router-dom";
import { categoryColors } from "../utils/categoryStyles";
import "./SocietyCard.css";

function SocietyCard({ society }) {
  const color = categoryColors[society.category];

  return (
    <Link
      to={`/society/${society.id}`}
      className="society-row"
      style={{ borderLeftColor: color }}
    >
      <div className="logo-chip">
        <img src={society.logo} alt={`${society.name} logo`} />
      </div>
      <div className="society-info">
        <h3>{society.name}</h3>
        <p className="tagline">{society.tagline}</p>
        <span className="category-label" style={{ color }}>
          {society.category}
        </span>
      </div>
    </Link>
  );
}

export default SocietyCard;
