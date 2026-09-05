function SocietyCard({ society }) {
  return (
    <div>
      <h2>{society.name}</h2>
      <p>{society.category}</p>
      <p>{society.tagline}</p>
    </div>
  );
}

export default SocietyCard;