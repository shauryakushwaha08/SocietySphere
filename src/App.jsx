import societies from "./data/societies";

function App() {
  return (
    <div>
      <h1>SocietySphere</h1>

      {societies.map((society) => (
        <div key={society.id}>
          <h2>{society.name}</h2>
          <p>{society.category}</p>
          <p>{society.tagline}</p>
        </div>
      ))}
    </div>
  );
}

export default App
