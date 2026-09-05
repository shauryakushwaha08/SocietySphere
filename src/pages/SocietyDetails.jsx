import { useParams, Link } from "react-router-dom";
import societies from "../data/societies";
import "./SocietyDetails.css";

function SocietyDetails() {
  const { id } = useParams();

  const society = societies.find((s) => s.id === id);

  if (!society) {
    return <div>Society not found</div>;
  }

  return (
    <div>
      <h1>{society.name}</h1>
      <p>{society.description}</p>
      <p>{society.eligibility}</p>
      <ul>
        {society.roles.map((role, index) => {
          return <li key={index}>{role}</li>;
        })}
      </ul>
      <Link to={`/apply/${id}`}>Apply Now</Link>
    </div>
  );
}

export default SocietyDetails;
