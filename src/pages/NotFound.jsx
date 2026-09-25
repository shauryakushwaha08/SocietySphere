import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Calendar, Sparkles, Search, ArrowLeft, MapPin } from "lucide-react";
import "./NotFound.css";

export default function NotFound({ onOpenSearch }) {
  const location = useLocation();

  return (
    <div className="not-found-page" id="not-found-page">
      <div className="not-found-container">
        <div className="not-found-badge">
          <MapPin size={14} />
          <span>Lost on Campus · Error 404</span>
        </div>

        <div className="not-found-code-display" aria-label="Error 404">
          <span>4</span>
          <span className="not-found-code-highlight">0</span>
          <span>4</span>
        </div>

        <h1 className="not-found-title">Page Not Found</h1>

        <p className="not-found-desc">
          Looks like you took a wrong turn past the Moksha ground. The campus route you are trying to visit does not exist or has been relocated.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="not-found-btn primary" id="not-found-home-btn">
            <Home size={16} />
            <span>Home</span>
          </Link>

          <Link to="/societies" className="not-found-btn secondary" id="not-found-societies-btn">
            <Compass size={16} />
            <span>Explore Societies</span>
          </Link>

          {onOpenSearch && (
            <button
              type="button"
              className="not-found-btn outline"
              onClick={onOpenSearch}
              id="not-found-search-btn"
            >
              <Search size={16} />
              <span>Search (Ctrl+K)</span>
            </button>
          )}
        </div>

        <div className="not-found-shortcuts">
          <div className="not-found-shortcuts-title">Quick Destinations</div>
          <div className="not-found-quick-links">
            <Link to="/events" className="not-found-pill-link">
              <Calendar size={13} />
              <span>Events &amp; Fests</span>
            </Link>
            <Link to="/find-your-fit" className="not-found-pill-link">
              <Sparkles size={13} />
              <span>Find Your Fit Quiz</span>
            </Link>
            <Link to="/applications" className="not-found-pill-link">
              <ArrowLeft size={13} />
              <span>My Applications</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
