import societies from "./data/societies";
import SocietyCard from "./components/SocietyCard";

function App() {
  return (
    <div>
      <h1>SocietySphere</h1>

      {societies.map((society) => (
        <SocietyCard key={society.id} society={society} />
      ))}
    </div>
  );
}

export default App
