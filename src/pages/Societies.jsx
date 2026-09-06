import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";
import "./Societies.css";

function Societies() {
  return (
    <div className="page-container">
      <h1>Societies</h1>
      <p className="page-intro">
        {societies.length} societies recruiting across campus.
      </p>
      <div className="society-grid">
        {societies.map((society) => (
          <SocietyCard key={society.id} society={society} />
        ))}
      </div>
    </div>
  );
}

export default Societies;
