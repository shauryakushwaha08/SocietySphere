import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";
import "./Societies.css";

function Societies() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...new Set(societies.map((s) => s.category))];

  const filteredSocieties = societies.filter((society) => {
    const matchesCategory = activeCategory === "All" || society.category === activeCategory;
    const searchText = `${society.name} ${society.tagline} ${society.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.toLowerCase());
  });

  return (
    <div className="societies-container">
      <div className="listing-heading">
        <div>
          <div className="section-kicker"><SlidersHorizontal size={14} /> FIND YOUR CIRCLE</div>
          <h1>Societies</h1>
          <p className="page-intro">
            {filteredSocieties.length} {filteredSocieties.length === 1 ? "community" : "communities"} to explore across campus.
          </p>
        </div>
        <label className="search-box">
          <Search size={18} />
          <input aria-label="Search societies" placeholder="Search societies" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>

      <div className="directory-toolbar">
        <span className="toolbar-label">Browse by focus</span>
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
      </div>

      {filteredSocieties.length === 0 ? (
        <p className="empty-state">No societies in this category yet.</p>
      ) : (
        <div className="society-grid" aria-label="Society directory">
          {filteredSocieties.map((society, index) => (
            <SocietyCard key={society.id} society={society} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Societies;
