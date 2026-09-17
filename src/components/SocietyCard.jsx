import { Link } from "react-router-dom";
import { ArrowUpRight, Users, Send, Compass, ArrowRight } from "lucide-react";
import { categoryColors, categoryBgColors, categoryCodes } from "../utils/categoryStyles";
import BookmarkButton from "./BookmarkButton";
import DeadlineCountdown from "./DeadlineCountdown";
import "./SocietyCard.css";

function SocietyCard({ society, index, viewMode = "grid" }) {
  const color = categoryColors[society.category] || "var(--theme)";
  const bgColor = categoryBgColors[society.category] || "rgba(61, 220, 151, 0.12)";
  const catCode = society.categoryCode || categoryCodes[society.category] || "SOC";
  const clubCode = society.code || society.name.slice(0, 4).toUpperCase();

  if (viewMode === "list") {
    return (
      <div key={society.id} className="match-card" style={{ borderLeftColor: color }}>
        <div className="match-main-content">
          <div className="match-logo-wrap">
            <img src={society.logo} alt={society.name} />
          </div>
          <div className="match-info">
            <div className="match-title-row">
              <Link to={`/society/${society.id}`} className="match-title-link">
                <h3>{society.name}</h3>
              </Link>
              <span
                className="category-label"
                style={{ color, backgroundColor: bgColor }}
                title={`Category: ${society.category} (${catCode})`}
              >
                {society.category}
              </span>
              <div className="society-side-meta" style={{marginLeft : "auto"}}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "0.25rem" }}>
                  <DeadlineCountdown deadline={society.recruitmentDeadline} compact={true} />
                  <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
                    <span className="status-dot" /> {society.recruitmentOpen ? "Recruiting" : "Closed"}
                  </span>
                </div>
              </div>
            </div>
            <p className="match-tagline">{society.tagline}</p>
            <p className="match-desc">{society.description}</p>
            <div className="match-tags">
              {society.tags?.map((t) => (
                <span key={t} className="match-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="match-card-actions">
          <BookmarkButton societyId={society.id} showLabel />
          <Link to={`/society/${society.id}`} className="match-details-btn">
            <Compass size={15} /> View Society
          </Link>
          {society.recruitmentOpen ? (
            <Link to={`/apply/${society.id}`} className="match-apply-btn">
              Apply Now <ArrowRight size={15} />
            </Link>
          ) : (
            <Link to={`/apply/${society.id}`} className="match-apply-btn closed">
              Apply Now <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
      
      
      // <div className="society-list-row" style={{ borderLeftColor: color }}>
      //   <span className="society-index">{String(index + 1).padStart(2, "0")}</span>
      //   <div className="logo-chip" style={{border : `1px solid ${color}`}}>
      //     <img src={society.logo} alt={`${society.name} logo`} loading="lazy" />
      //   </div>
      //   <div className="society-info">
      //     <div className="society-title-row">
      //       <Link to={`/society/${society.id}`} className="society-name-link">
      //         <h3>{society.name}</h3>
      //       </Link>
      //       <span
      //         className="category-label"
      //         style={{ color, backgroundColor: bgColor }}
      //         title={`Category: ${society.category} (${catCode})`}
      //       >
      //         {society.category}
      //       </span>
      //     </div>
      //     <p className="tagline">{society.tagline}</p>
      //     <div className="society-card-tags">
      //       {society.tags?.slice(0, 3).map((tag) => (
      //         <span key={tag} className="society-tag-pill">
      //           {tag}
      //         </span>
      //       ))}
      //     </div>
      //   </div>

        // <div className="society-side-meta">
        //   <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: "0.25rem" }}>
        //     {society.recruitmentOpen && society.recruitmentDeadline && (
        //       <DeadlineCountdown deadline={society.recruitmentDeadline} compact={true} />
        //     )}
        //     <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
        //       <span className="status-dot" /> {society.recruitmentOpen ? "Recruiting" : "Closed"}
        //     </span>
        //   </div>

        //   <div className="society-action-btns">
        //     <BookmarkButton societyId={society.id} />
        //     {society.recruitmentOpen ? (
        //       <Link to={`/apply/${society.id}`} className="card-apply-btn" title="Apply now">
        //         <Send size={13} />
        //         <span>Apply</span>
        //       </Link>
        //     ) : (
        //       <Link className="card-apply-btn closed" title="Apply now">
        //         <Send size={13} />
        //         <span>Apply</span>
        //       </Link>
        //     )}
        //     <Link to={`/society/${society.id}`} className="card-view-btn" title="View details">
        //       <ArrowUpRight size={16} />
        //     </Link>
        //   </div>
        // </div>
      // </div>
    );
  }

  // Grid view (modern card layout)
  return (
    <article className="society-card" style={{ borderTopColor: color }}>
      <div className="society-card-header">
        <div className="logo-chip" style={{border : `1px solid ${color}`}}>
          <img src={society.logo} alt={`${society.name} logo`} loading="lazy" />
        </div>
        <div className="card-header-actions">
          <span
            className="category-label"
            style={{ color, backgroundColor: bgColor }}
            title={`Category: ${society.category} (${catCode})`}
          >
            {society.category}
          </span>
          <BookmarkButton societyId={society.id} />
        </div>
      </div>

      <div className="society-card-body">


        <Link to={`/society/${society.id}`} className="card-title-link">
          <h3>{society.name}</h3>
        </Link>
        <p className="card-tagline">{society.tagline}</p>
        {society.description && (
          <p className="society-list-desc">{society.description}</p>
        )}
        {society.tags && (
          <div className="society-card-tags">
            {society.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="society-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-deadline-hint">
          <div className="status-badge-row">
            <span className={`status-badge ${society.recruitmentOpen ? "open" : "closed"}`}>
              <span className="status-dot" /> {society.recruitmentOpen ? "Recruitment Open" : "Closed"}
            </span>
          </div>
          <DeadlineCountdown deadline={society.recruitmentDeadline} compact={true} />
        </div>
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
