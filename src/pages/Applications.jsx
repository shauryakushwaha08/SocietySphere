import { useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Trash2,
  Calendar,
  Sparkles,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getApplications } from "../utils/storage";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState(getApplications);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDelete = (indexToDelete) => {
    const updated = applications.filter((_, idx) => idx !== indexToDelete);
    setApplications(updated);
    localStorage.setItem("applications", JSON.stringify(updated));
    setConfirmDeleteId(null);
  };

  return (
    <main className="applications-container">
      <div className="applications-heading">
        <div>
          <div className="section-kicker">
            <FileText size={14} /> CANDIDATE ACTIVITY
          </div>
          <h1>My Applications</h1>
          <p className="page-intro">
            Keep track of societies and domain tracks you have raised your hand for.
          </p>
        </div>
        {applications.length > 0 && (
          <span className="application-count">
            {applications.length} {applications.length === 1 ? "application" : "applications"} submitted
          </span>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="applications-empty">
          <div className="empty-icon">
            <FileText size={32} />
          </div>
          <h2>No applications submitted yet</h2>
          <p>
            Your next big campus project or team is just one submission away. Check out currently recruiting societies or take the quiz to discover your fit.
          </p>
          <div className="empty-cta-row">
            <Link to="/societies" className="empty-cta primary">
              <Compass size={16} /> Explore Societies
            </Link>
            <Link to="/find-your-fit" className="empty-cta secondary">
              <Sparkles size={16} /> Take Matcher Quiz
            </Link>
          </div>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application, index) => {
            const society = societies.find((s) => s.id === application.societyId);
            const color = society ? categoryColors[society.category] : "var(--theme)";
            const submittedDate = application.submittedAt
              ? new Date(application.submittedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recently";

            return (
              <article
                className="application-card"
                key={index}
                style={{ borderLeftColor: color }}
              >
                <div className="application-topline">
                  <div className="application-society">
                    <div className="application-logo">
                      {society ? (
                        <img
                          src={society.logo}
                          alt={`${application.societyName} logo`}
                        />
                      ) : (
                        <FileText size={22} />
                      )}
                    </div>
                    <div>
                      <span className="application-eyebrow">APPLICATION FOR</span>
                      <h2>{application.societyName}</h2>
                      {society && (
                        <span className="application-category" style={{ color }}>
                          {society.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="topline-right-status">
                    <span className="submitted-status">
                      <span className="live-dot" /> In Review
                    </span>
                    <span className="date-stamp">
                      <Calendar size={12} /> {submittedDate}
                    </span>
                  </div>
                </div>

                <div className="application-details-grid">
                  <div className="detail-item">
                    <span>Applicant</span>
                    <strong>{application.name}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Target Role</span>
                    <strong className="role-highlight">{application.role}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Year &amp; Branch</span>
                    <strong>
                      {application.year} · {application.branch}
                    </strong>
                  </div>
                  {application.phone && (
                    <div className="detail-item">
                      <span>Contact Number</span>
                      <strong>{application.phone}</strong>
                    </div>
                  )}
                  {application.portfolio && (
                    <div className="detail-item">
                      <span>Portfolio / Profile</span>
                      <a
                        href={application.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link"
                      >
                        {application.portfolio.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>

                <div className="why-text-block">
                  <span className="why-label">Submitted Pitch:</span>
                  <p className="why-text">&ldquo;{application.why}&rdquo;</p>
                </div>

                <div className="application-card-footer">
                  {society && (
                    <Link to={`/society/${society.id}`} className="application-link">
                      View Society Profile <ArrowUpRight size={14} />
                    </Link>
                  )}

                  {confirmDeleteId === index ? (
                    <div className="confirm-withdraw-block">
                      <span>Withdraw application?</span>
                      <button
                        type="button"
                        className="confirm-yes"
                        onClick={() => handleDelete(index)}
                      >
                        Yes, Withdraw
                      </button>
                      <button
                        type="button"
                        className="confirm-no"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="withdraw-btn"
                      onClick={() => setConfirmDeleteId(index)}
                    >
                      <Trash2 size={13} /> Withdraw
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Applications;
