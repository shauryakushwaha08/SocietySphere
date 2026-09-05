import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";
import "./Societies.css";

function Societies() {
  return (
    <div className="society-grid">
      {societies.map((society) => (
        <SocietyCard key={society.id} society={society} />
      ))}
    </div>
  );
}

export default Societies;
