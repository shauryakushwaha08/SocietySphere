import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Users,
  Clock,
  ExternalLink,
  ChevronDown,
  Share2,
  Send,
  HelpCircle,
  Trophy,
  GitBranch,
  Columns,
} from "lucide-react";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import BookmarkButton from "../components/BookmarkButton";
import DeadlineCountdown from "../components/DeadlineCountdown";
import "./SocietyDetails.css";

function SocietyDetails() {
  const { id } = useParams();
  const society = societies.find((s) => s.id === id);

  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'roles' | 'roadmap' | 'events' | 'faqs'
  const [copiedToast, setCopiedToast] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  if (!society) {
    return (
      <div className="page-container empty-page">
        <h1>Society not found</h1>
        <p>The society you are looking for does not exist or has been relocated.</p>
        <Link to="/societies" className="back-to-soc-link">
          <ArrowLeft size={16} /> Back to all societies
        </Link>
      </div>
    );
  }

  const color = categoryColors[society.category] || "var(--theme)";

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <main className="society-details-wrapper">
      {/* Back link */}
      <div className="details-nav-bar">
        <Link to="/societies" className="back-link">
          <ArrowLeft size={16} /> Back to Directory
        </Link>

        <div className="details-top-actions">
          <BookmarkButton societyId={society.id} showLabel />
          <button
            type="button"
            className="share-btn"
            onClick={handleShare}
            aria-label="Share society link"
            title="Copy shareable link"
          >
            <Share2 size={15} />
            <span>{copiedToast ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <section className="society-hero-card" style={{ borderTopColor: color }}>
        <div className="hero-top-row">
          <div className="logo-chip large">
            <img src={society.logo} alt={`${society.name} logo`} />
          </div>

          <div className="hero-main-title-block">
            <div className="hero-badges-row">
              <span className="category-pill" style={{ color }}>
                {society.category}
              </span>
              <span
                className={`details-status-badge ${
                  society.recruitmentOpen ? "open" : "closed"
                }`}
              >
                <span className="status-dot" />{" "}
                {society.recruitmentOpen ? "Recruiting Now" : "Recruitment Closed"}
              </span>
            </div>

            <h1>{society.name}</h1>
            {society.fullName && (
              <p className="full-name">{society.fullName}</p>
            )}
            <p className="hero-tagline">{society.tagline}</p>
          </div>

          {/* Direct CTA */}
          <div className="hero-cta-block">
            {society.recruitmentOpen ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%", maxWidth: "340px" }}>
                <Link to={`/apply/${society.id}`} className="hero-apply-btn">
                  <span>Apply for Roles</span>
                  <Send size={15} />
                </Link>
                {society.recruitmentDeadline && (
                  <div className="deadline-block">
                    <span className="deadline-subtext">
                      <Clock size={12} /> Deadline: {society.recruitmentDeadline}
                    </span>
                    <DeadlineCountdown deadline={society.recruitmentDeadline} compact={false} />
                  </div>
                )}
              </div>
            ) : (
              <span className="recruitment-closed-pill">Recruitment Closed</span>
            )}
          </div>
        </div>

        {/* Quick Meta Indicators Bar */}
        <div className="hero-meta-bar">
          {society.foundedYear && (
            <div className="meta-bar-item">
              <span className="meta-bar-label">Established</span>
              <strong>{society.foundedYear}</strong>
            </div>
          )}
          {society.membersCount && (
            <div className="meta-bar-item">
              <span className="meta-bar-label">Active Members</span>
              <strong>{society.membersCount}</strong>
            </div>
          )}
          {society.meetingSchedule && (
            <div className="meta-bar-item">
              <span className="meta-bar-label">Typical Meetups</span>
              <strong>{society.meetingSchedule}</strong>
            </div>
          )}
          <div className="meta-bar-item">
            <span className="meta-bar-label">Open Tracks</span>
            <strong>{society.roles.length} Domains</strong>
          </div>
        </div>
      </section>

      {/* Tabs navigation */}
      <div className="details-tabs-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "overview"}
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview &amp; Mission
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "roles"}
          className={`tab-btn ${activeTab === "roles" ? "active" : ""}`}
          onClick={() => setActiveTab("roles")}
        >
          Roles &amp; Eligibility ({society.roles.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "roadmap"}
          className={`tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
          onClick={() => setActiveTab("roadmap")}
        >
          Recruitment Stages
        </button>
        {society.flagshipEvents && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "events"}
            className={`tab-btn ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            Flagship Fests
          </button>
        )}
        {society.faqs && (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "faqs"}
            className={`tab-btn ${activeTab === "faqs" ? "active" : ""}`}
            onClick={() => setActiveTab("faqs")}
          >
            FAQs
          </button>
        )}
      </div>

      {/* Tab Content Panels */}
      <div className="details-content-panel">
        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="tab-pane fade-in">
            <section className="details-section-card">
              <h2>About {society.name}</h2>
              <p className="detailed-desc">{society.description}</p>

              {society.tags && (
                <div className="tags-block">
                  <span className="tags-label">Key Focus Areas:</span>
                  <div className="tags-list">
                    {society.tags.map((t) => (
                      <span key={t} className="focus-tag">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Leadership & Contacts */}
            {society.leads && (
              <section className="details-section-card">
                <div className="section-title-wrap">
                  <Users size={18} />
                  <h2>Student Leadership Team</h2>
                </div>
                <div className="leads-grid">
                  {society.leads.map((lead) => (
                    <div key={lead.name} className="lead-card">
                      <strong>{lead.name}</strong>
                      <span className="lead-role">{lead.role}</span>
                      <a href={`mailto:${lead.contact}`} className="lead-email">
                        {lead.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Socials */}
            {society.socials && (
              <section className="details-section-card">
                <div className="section-title-wrap">
                  <ExternalLink size={18} />
                  <h2>Connect &amp; Social Channels</h2>
                </div>
                <div className="socials-links-grid">
                  {Object.entries(society.socials).map(([network, url]) => (
                    <a
                      key={network}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-channel-link"
                    >
                      <span className="network-name">{network}</span>
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Tab 2: Roles & Eligibility */}
        {activeTab === "roles" && (
          <div className="tab-pane fade-in">
            <section className="details-section-card">
              <div className="section-title-wrap">
                <Users size={18} />
                <h2>Eligibility Criteria</h2>
              </div>
              <p className="eligibility-text">{society.eligibility}</p>
            </section>

            <section className="details-section-card">
              <div className="section-title-wrap">
                <BriefcaseBusiness size={18} />
                <h2>Available Recruitment Tracks</h2>
              </div>
              <p className="section-instruction">
                Select your preferred track when filling out the application form.
              </p>
              <div className="roles-cards-grid">
                {society.roles.map((role) => (
                  <div key={role} className="role-detail-card">
                    <div className="role-icon-bullet">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <strong>{role}</strong>
                      <p>
                        Open for junior and sophomore contributors eager to work on projects and events.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 3: Recruitment Roadmap */}
        {activeTab === "roadmap" && (
          <div className="tab-pane fade-in">
            <section className="details-section-card">
              <div className="section-title-wrap">
                <GitBranch size={18} />
                <h2>Recruitment Pipeline &amp; Stages</h2>
              </div>
              <p className="section-instruction">
                Here is what to expect after raising your hand for {society.name}.
              </p>

              <div className="roadmap-stages">
                {(
                  society.interviewProcess || [
                    { step: 1, title: "Online Application", detail: "Fill out your background and intent pitch on SocietySphere." },
                    { step: 2, title: "Domain Task / Screening", detail: "Short exercise or practical assignment." },
                    { step: 3, title: "Final Interview & Onboarding", detail: "One-on-one discussion with domain leads." },
                  ]
                ).map((stage) => (
                  <div key={stage.step} className="roadmap-step-card">
                    <div className="step-number-circle">0{stage.step}</div>
                    <div className="step-content">
                      <h3>{stage.title}</h3>
                      <p>{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 4: Flagship Events */}
        {activeTab === "events" && society.flagshipEvents && (
          <div className="tab-pane fade-in">
            <section className="details-section-card">
              <div className="section-title-wrap">
                <Trophy size={18} />
                <h2>Signature Campus Events &amp; Initiatives</h2>
              </div>
              <div className="flagships-grid">
                {society.flagshipEvents.map((evt) => (
                  <div key={evt.name} className="flagship-card">
                    <h3>{evt.name}</h3>
                    <p>{evt.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Tab 5: FAQs */}
        {activeTab === "faqs" && society.faqs && (
          <div className="tab-pane fade-in">
            <section className="details-section-card">
              <div className="section-title-wrap">
                <HelpCircle size={18} />
                <h2>Frequently Asked Questions</h2>
              </div>
              <div className="faqs-accordion">
                {society.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                      <button
                        type="button"
                        className="faq-question-btn"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`faq-chevron ${isOpen ? "rotate" : ""}`}
                        />
                      </button>
                      {isOpen && <div className="faq-answer-block"><p>{faq.a}</p></div>}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Banner */}
      <div className="details-bottom-bar">
        <div>
          <strong>Ready to put your name forward?</strong>
          <span>Join {society.name} and build something memorable this semester.</span>
        </div>
        {society.recruitmentOpen ? (
          <Link to={`/apply/${society.id}`} className="sticky-apply-btn">
            Apply Now <ArrowRight size={16} />
          </Link>
        ) : (
          <span className="sticky-closed-btn">Applications Closed</span>
        )}
      </div>
    </main>
  );
}

export default SocietyDetails;
