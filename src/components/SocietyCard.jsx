import { Link } from "react-router-dom";
import "./SocietyCard.css";

function SocietyCard({ society }) {
  return (
    <div className="society-card">
      <h2>{society.name}</h2>
      <p className="category">{society.category}</p>
      <p className="tagline">{society.tagline}</p>
      <Link to={`/society/${society.id}`}>View Details</Link>
    </div>
  );
}

export default SocietyCard;
