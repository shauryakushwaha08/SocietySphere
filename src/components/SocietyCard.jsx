import { Link } from "react-router-dom";

function SocietyCard({ society }) {
  return (
    <div>
      <h2>{society.name}</h2>
      <p>{society.category}</p>
      <p>{society.tagline}</p>
      <Link to={`/society/${society.id}`}>View Details</Link>
    </div>
  );
}

export default SocietyCard;
