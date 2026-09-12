import { Link } from "react-router-dom";
import { ArrowUpRight, Users, Send } from "lucide-react";
import { categoryColors } from "../utils/categoryStyles";
import BookmarkButton from "./BookmarkButton";
import DeadlineCountdown from "./DeadlineCountdown";
import "./SocietyCard.css";

function SocietyCard({ society, index, viewMode = "grid" }) {
  const color = categoryColors[society.category] || "var(--theme)";

  if (viewMode === "list") {
    return (
      <div className="society-list-row" style={{ borderLeftColor: color }}>
        <span className="society-index">{String(index + 1).padStart(2, "0")}</span>
        <div className="logo-chip">
          <img src={society.logo} alt={`${society.name} logo`} loading="lazy" />
        </div>
        <div className="society-info">
          <div className="society-title-row">
            <Link to={`/society/${society.id}`} className="society-name-link">
              <h3>{society.name}</h3>
            </Link>
            <span className="category-label" style={{ color }}>
              {society.category}
            </span>
          </div>
          <p className="tagline">{society.tagline}</p>
          <div className="society-card-tags">
            {society.tags?.slice(0, 3).map((tag) => (
              <span key={tag} className="society-tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="society-side-meta">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
            <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
              <span className="status-dot" /> {society.recruitmentOpen ? "Recruiting" : "Closed"}
            </span>
            {society.recruitmentOpen && society.recruitmentDeadline && (
              <DeadlineCountdown deadline={society.recruitmentDeadline} compact={true} />
            )}
          </div>

          <div className="society-action-btns">
            <BookmarkButton societyId={society.id} />
            {society.recruitmentOpen ? (
              <Link to={`/apply/${society.id}`} className="card-apply-btn" title="Apply now">
                <Send size={13} />
                <span>Apply</span>
              </Link>
            ) : (
              <Link className="card-apply-btn closed" title="Apply now">
                <Send size={13} />
                <span>Apply</span>
              </Link>
            )}
            <Link to={`/society/${society.id}`} className="card-view-btn" title="View details">
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (modern card layout)
  return (
    <article className="society-card" style={{ borderTopColor: color }}>
      <div className="society-card-header">
        <div className="logo-chip">
          <img src={society.logo} alt={`${society.name} logo`} loading="lazy" />
        </div>
        <div className="card-header-actions">
          <span className="category-label" style={{ color }}>
            {society.category}
          </span>
          <BookmarkButton societyId={society.id} />
        </div>
      </div>

      <div className="society-card-body">
        <div className="status-badge-row">
          <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
            <span className="status-dot" /> {society.recruitmentOpen ? "Recruitment Open" : "Closed"}
          </span>
          {society.membersCount && (
            <span className="members-badge">
              <Users size={12} /> {society.membersCount}
            </span>
          )}
        </div>

        <Link to={`/society/${society.id}`} className="card-title-link">
          <h3>{society.name}</h3>
        </Link>
        <p className="card-tagline">{society.tagline}</p>

        {society.tags && (
          <div className="society-card-tags">
            {society.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="society-tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {society.recruitmentOpen && society.recruitmentDeadline && (
          <div className="card-deadline-hint">
            <DeadlineCountdown deadline={society.recruitmentDeadline} compact={true} />
          </div>
        )}
      </div>

      <div className="society-card-footer">
        <Link to={`/society/${society.id}`} className="card-details-link">
          Explore Details <ArrowUpRight size={15} />
        </Link>
        {society.recruitmentOpen ? (
          <Link to={`/apply/${society.id}`} className="card-apply-pill">
            Apply <Send size={12} />
          </Link>
        ) : (
          <Link className="card-apply-pill closed" title="Apply now">
            <Send size={13} />
            <span>Apply</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default SocietyCard;
