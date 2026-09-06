import { useParams, Link } from "react-router-dom";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import "./SocietyDetails.css";

function SocietyDetails() {
  const { id } = useParams();
  const society = societies.find((s) => s.id === id);

  if (!society) {
    return <div className="page-container">Society not found</div>;
  }

  const color = categoryColors[society.category];

  return (
    <div className="page-container details-page">
      <div className="details-header">
        <div className="logo-chip large">
          <img src={society.logo} alt={`${society.name} logo`} />
        </div>
        <div>
          <h1>{society.name}</h1>
          <span className="category-label" style={{ color }}>
            {society.category}
          </span>
        </div>
      </div>

      <p className="description">{society.description}</p>

      <h3>Recruitment Criteria</h3>
      <p>{society.eligibility}</p>

      <h3>Open Roles</h3>
      <ul className="roles-list">
        {society.roles.map((role, index) => (
          <li key={index} style={{ borderLeftColor: color }}>
            {role}
          </li>
        ))}
      </ul>

      <Link
        to={`/apply/${id}`}
        className="apply-btn"
        style={{ backgroundColor: color }}
      >
        Apply Now
      </Link>
    </div>
  );
}

export default SocietyDetails;
