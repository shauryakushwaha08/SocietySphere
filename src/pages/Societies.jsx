import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Bookmark,
  Sparkles,
  X,
  RotateCcw,
} from "lucide-react";
import societies from "../data/societies";
import SocietyCard from "../components/SocietyCard";
import SocietyCardSkeleton from "../components/SocietyCardSkeleton";
import { getBookmarks } from "../utils/storage";
import "./Societies.css";

function Societies() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL query parameters if present
  const categoryParam = searchParams.get("category");
  const recruitingParam = searchParams.get("recruiting");
  const queryParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "All");
  const [recruitmentFilter, setRecruitmentFilter] = useState(
    recruitingParam === "true" ? "open" : "all"
  );
  const onlySaved = searchParams.get("saved") === "true";
  const [query, setQuery] = useState(queryParam || "");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [bookmarkedIds, setBookmarkedIds] = useState(getBookmarks);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleCategorySelect = (cat) => {
    if (cat === activeCategory) return;
    setIsFiltering(true);
    setActiveCategory(cat);
    setTimeout(() => setIsFiltering(false), 200);
  };

  const setOnlySaved = (valueOrFn) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.get("saved") === "true";
      const nextVal = typeof valueOrFn === "function" ? valueOrFn(current) : valueOrFn;
      if (nextVal) {
        next.set("saved", "true");
      } else {
        next.delete("saved");
      }
      return next;
    });
  };

  // Sync bookmark updates
  useEffect(() => {
    function handleSync(e) {
      if (e.detail) setBookmarkedIds(e.detail);
    }
    window.addEventListener("societysphere:bookmarks-updated", handleSync);
    return () => window.removeEventListener("societysphere:bookmarks-updated", handleSync);
  }, []);

  // Sync URL search params
  useEffect(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (activeCategory !== "All") next.set("category", activeCategory);
      else next.delete("category");

      if (recruitmentFilter === "open") next.set("recruiting", "true");
      else next.delete("recruiting");

      if (query.trim()) next.set("q", query.trim());
      else next.delete("q");

      return next;
    }, { replace: true });
  }, [activeCategory, recruitmentFilter, query, setSearchParams]);

  const categories = ["All", ...new Set(societies.map((s) => s.category))];

  // Filtering logic
  const filteredSocieties = societies
    .filter((society) => {
      const matchesCategory =
        activeCategory === "All" || society.category === activeCategory;

      const matchesRecruitment =
        recruitmentFilter === "all" ||
        (recruitmentFilter === "open" && society.recruitmentOpen) ||
        (recruitmentFilter === "closed" && !society.recruitmentOpen);

      const matchesSaved = !onlySaved || bookmarkedIds.includes(society.id);

      const searchText =
        `${society.name} ${society.fullName} ${society.tagline} ${society.category} ${society.roles.join(" ")} ${society.tags?.join(" ") || ""}`.toLowerCase();
      const matchesSearch = searchText.includes(query.toLowerCase().trim());

      return matchesCategory && matchesRecruitment && matchesSaved && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "recruiting-first") return (b.recruitmentOpen ? 1 : 0) - (a.recruitmentOpen ? 1 : 0);
      if (sortBy === "members") return parseInt(b.membersCount || "0", 10) - parseInt(a.membersCount || "0", 10);
      return 0;
    });

  const clearFilters = () => {
    setActiveCategory("All");
    setRecruitmentFilter("all");
    setOnlySaved(false);
    setQuery("");
    setSortBy("default");
  };

  const hasActiveFilters =
    activeCategory !== "All" ||
    recruitmentFilter !== "all" ||
    onlySaved ||
    query.trim() !== "" ||
    sortBy !== "default";

  return (
    <div className="societies-container">
      {/* Header section */}
      <div className="listing-heading">
        <div>
          <div className="section-kicker">
            <SlidersHorizontal size={14} /> EXPLORE DIRECTORY
          </div>
          <h1>College Societies</h1>
          <p className="page-intro">
            Discover recognized student communities, leadership opportunities, and open recruitment cycles at NSUT.
          </p>
        </div>

        {/* Global Search Box */}
        <label className="search-box">
          <Search size={18} />
          <input
            aria-label="Search societies"
            placeholder="Search societies, roles, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="clear-query-btn"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      {/* Directory Filters Bar */}
      <div className="directory-toolbar-card">
        {/* Category Tabs */}
        <div className="toolbar-top-row">
          <div className="category-tabs">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? societies.length
                  : societies.filter((s) => s.category === cat).length;

              return (
                <button
                  key={cat}
                  className={`category-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  <span>{cat}</span>
                  <span className="tab-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (Grid vs List) */}
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              type="button"
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
              title="List view"
            >
              <List size={17} />
            </button>
          </div>
        </div>

        {/* Sub-Filters: Recruitment status, Saved filter, Sort */}
        <div className="toolbar-sub-row">
          <div className="quick-filter-pills">
            <button
              type="button"
              className={`filter-pill ${recruitmentFilter === "open" ? "active" : ""}`}
              onClick={() =>
                setRecruitmentFilter((prev) => (prev === "open" ? "all" : "open"))
              }
            >
              <Sparkles size={13} />
              <span>Recruiting Only</span>
            </button>

            <button
              type="button"
              className={`filter-pill ${onlySaved ? "active" : ""}`}
              onClick={() => setOnlySaved((prev) => !prev)}
            >
              <Bookmark size={13} fill={onlySaved ? "currentColor" : "none"} />
              <span>Saved Societies ({bookmarkedIds.length})</span>
            </button>
          </div>

          <div className="sort-dropdown-wrap">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="recruiting-first">Recruiting First</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
              <option value="members">Most Members</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="active-filters-bar">
          <span>Active Filters:</span>
          {activeCategory !== "All" && (
            <span className="filter-tag">
              Category: {activeCategory}{" "}
              <button type="button" onClick={() => setActiveCategory("All")}>
                ×
              </button>
            </span>
          )}
          {recruitmentFilter === "open" && (
            <span className="filter-tag">
              Recruiting Only{" "}
              <button type="button" onClick={() => setRecruitmentFilter("all")}>
                ×
              </button>
            </span>
          )}
          {onlySaved && (
            <span className="filter-tag">
              Bookmarked Only{" "}
              <button type="button" onClick={() => setOnlySaved(false)}>
                ×
              </button>
            </span>
          )}
          {query.trim() && (
            <span className="filter-tag">
              Query: &ldquo;{query}&rdquo;{" "}
              <button type="button" onClick={() => setQuery("")}>
                ×
              </button>
            </span>
          )}
          <button type="button" className="reset-all-btn" onClick={clearFilters}>
            <RotateCcw size={12} /> Clear all
          </button>
        </div>
      )}

      {/* Grid or List of Societies */}
      {isFiltering ? (
        <div
          className={viewMode === "grid" ? "society-grid-view" : "society-list-view"}
          aria-label="Loading directory"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SocietyCardSkeleton key={n} viewMode={viewMode} />
          ))}
        </div>
      ) : filteredSocieties.length === 0 ? (
        <div className="empty-state-box">
          <Bookmark size={34} className="empty-icon" />
          <h3>No societies match your criteria</h3>
          <p>
            {onlySaved
              ? "You haven't saved any societies yet. Click the bookmark icon on any society card to save it."
              : "Try relaxing your search keywords or switching category filters."}
          </p>
          <button type="button" className="clear-filters-btn" onClick={clearFilters}>
            Reset all filters
          </button>
        </div>
      ) : (
        <div
          className={viewMode === "grid" ? "society-grid-view" : "society-list-view"}
          aria-label="Society directory"
        >
          {filteredSocieties.map((society, index) => (
            <SocietyCard
              key={society.id}
              society={society}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Societies;
