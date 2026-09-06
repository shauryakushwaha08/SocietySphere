import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
} from "lucide-react";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import "./SocietyDetails.css";

function SocietyDetails() {
  const { id } = useParams();
  const society = societies.find((s) => s.id === id);

  if (!society) {
    return (
      <div className="page-container empty-page">
        <h1>Society not found</h1>
        <Link to="/societies" className="text-link">
          Back to societies <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const color = categoryColors[society.category];

  return (
    <main className="page-container details-page">
      <Link to="/societies" className="back-link">
        <ArrowLeft size={16} /> All societies
      </Link>
      <div className="details-hero">
        <div className="details-header">
          <div className="logo-chip large">
            <img src={society.logo} alt={`${society.name} logo`} />
          </div>
          <div>
            <div className="section-kicker">
              {society.category.toUpperCase()} COMMUNITY
            </div>
            <h1>{society.name}</h1>
            <p className="details-tagline">{society.tagline}</p>
          </div>
        </div>
        <span
          className={`details-status ${society.recruitmentOpen ? "open" : "closed"}`}
        >
          <span className="status-dot" />{" "}
          {society.recruitmentOpen ? "Recruitment open" : "Recruitment closed"}
        </span>
      </div>

      <p className="description">{society.description}</p>

      <div className="details-grid">
        <section className="details-section">
          <div className="section-heading">
            <Users size={18} />
            <h2>Who can join</h2>
          </div>
          <p>{society.eligibility}</p>
        </section>
        <section className="details-section">
          <div className="section-heading">
            <BriefcaseBusiness size={18} />
            <h2>Open roles</h2>
          </div>
          <ul className="roles-list">
            {society.roles.map((role) => (
              <li key={role} style={{ borderLeftColor: color }}>
                <CheckCircle2 size={16} />
                {role}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="details-footer">
        <div>
          <strong>Ready to get involved?</strong>
          <span>Tell them what you want to build.</span>
        </div>
        {society.recruitmentOpen ? (
          <Link
            to={`/apply/${id}`}
            className="apply-btn"
            style={{ backgroundColor: color }}
          >
            Start application <ArrowRight size={17} />
          </Link>
        ) : (
          <span className="details-status closed">Recruitment closed</span>
        )}
      </div>
    </main>
  );
}

export default SocietyDetails;
