import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";

function Societies() {
  return (
    <div>
      {societies.map((society) => (
        <SocietyCard key={society.id} society={society} />
      ))}
    </div>
  );
}

export default Societies;
