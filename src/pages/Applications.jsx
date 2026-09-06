import { useState } from "react";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { getApplications } from "../utils/storage";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import "./Applications.css";

function Applications() {
  const [applications] = useState(getApplications);

  return (
    <main className="applications-container">
      <div className="applications-heading">
        <div>
          <div className="section-kicker"><FileText size={14} /> YOUR ACTIVITY</div>
          <h1>Applications</h1>
          <p className="page-intro">Keep track of the communities you’ve raised your hand for.</p>
        </div>
        {applications.length > 0 && <span className="application-count">{applications.length} {applications.length === 1 ? "application" : "applications"}</span>}
      </div>

      {applications.length === 0 ? (
        <div className="applications-empty">
          <div className="empty-icon"><FileText size={26} /></div>
          <h2>No applications yet</h2>
          <p>Your next opportunity is probably one browse away.</p>
          <Link to="/societies" className="empty-cta">Explore societies <ArrowRight size={17} /></Link>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((application, index) => {
            const society = societies.find(
              (s) => s.id === application.societyId,
            );
            const color = society
              ? categoryColors[society.category]
              : "var(--text-soft)";

            return (
              <article
                className="application-card"
                key={index}
                style={{ borderLeftColor: color }}
              >
                <div className="application-topline">
                  <div className="application-society">
                    <div className="application-logo">
                      {society ? <img src={society.logo} alt={`${application.societyName} logo`} /> : <FileText size={19} />}
                    </div>
                    <div>
                      <span className="application-eyebrow">APPLICATION TO</span>
                      <h2>{application.societyName}</h2>
                      {society && <span className="application-category" style={{ color }}>{society.category}</span>}
                    </div>
                  </div>
                  <span className="submitted-status"><span /> Submitted</span>
                </div>
                <div className="application-details">
                  <div><span>Applicant</span><strong>{application.name}</strong></div>
                  <div><span>Role</span><strong>{application.role}</strong></div>
                  <div><span>Year & branch</span><strong>{application.year} · {application.branch}</strong></div>
                </div>
                <p className="why-text">“{application.why}”</p>
                {society && <Link to={`/society/${society.id}`} className="application-link">View society <ArrowUpRight size={15} /></Link>}
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default Applications;
