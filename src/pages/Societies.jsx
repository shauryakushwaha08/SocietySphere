import { useState } from "react";
import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";
import "./Societies.css";

function Societies() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(societies.map((s) => s.category))];

  const filteredSocieties =
    activeCategory === "All"
      ? societies
      : societies.filter((s) => s.category === activeCategory);

  return (
    <div className="societies-container">
      <h1>Societies</h1>
      <p className="page-intro">
        {filteredSocieties.length} societies recruiting across campus.
      </p>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredSocieties.length === 0 ? (
        <p className="empty-state">No societies in this category yet.</p>
      ) : (
        <div className="society-grid">
          {filteredSocieties.map((society) => (
            <SocietyCard key={society.id} society={society} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Societies;
