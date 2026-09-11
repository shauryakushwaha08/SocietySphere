import { useState } from "react";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Calendar,
  Users,
  Search,
  Clock,
  Layers,
  Award,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import societies from "../data/societies";
import { campusEvents } from "../data/events";
import { categoryColors } from "../utils/categoryStyles";
import BookmarkButton from "../components/BookmarkButton";
import "./Home.css";

function Home() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const totalSocieties = societies.length;
  const recruitingSocieties = societies.filter((s) => s.recruitmentOpen);
  const totalRoles = societies.reduce((sum, s) => sum + s.roles.length, 0);
  const upcomingEvents = campusEvents.slice(0, 3);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/societies?q=${encodeURIComponent(searchVal.trim())}`);
    } else {
      navigate("/societies");
    }
  };

  return (
    <div className="home-page-root">
      <section className="home-hero">
        <div className="hero-kicker">
          <span className="kicker-dot" /> CAMPUS LIFE AT NSUT
        </div>

        <h1>
          Find the room where <em>your</em> ideas get louder.
        </h1>

        <p className="hero-sub">
          Browse verified college societies, discover upcoming orientations and deadlines, and put your name forward in minutes.
        </p>

        <form className="hero-search-form" onSubmit={handleHeroSearch}>
          <Search size={18} className="hero-search-icon" />
          <input
            type="text"
            placeholder="Search by society name, skill, domain, or role..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            aria-label="Quick search societies"
          />
          <button type="submit" className="hero-search-submit">
            Search
          </button>
        </form>

        <div className="hero-quick-chips">
          <span className="quick-label">Jump to:</span>
          <Link to="/societies?category=Tech" className="hero-chip tech">
            Tech &amp; Coding ({societies.filter((s) => s.category === "Tech").length})
          </Link>
          <Link to="/societies?category=Literary" className="hero-chip literary">
            Literary &amp; Debate ({societies.filter((s) => s.category === "Literary").length})
          </Link>
          <Link to="/societies?category=Sports" className="hero-chip sports">
            Sports &amp; Athletics ({societies.filter((s) => s.category === "Sports").length})
          </Link>
          <Link to="/societies?recruiting=true" className="hero-chip open">
            ● Recruiting Now ({recruitingSocieties.length})
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat">
            <Compass size={22} />
            <div>
              <span className="stat-number">{totalSocieties}</span>
              <span className="stat-label">Recognized Societies</span>
            </div>
          </div>
          <div className="stat">
            <Sparkles size={22} />
            <div>
              <span className="stat-number">{totalRoles}+</span>
              <span className="stat-label">Specialized Roles</span>
            </div>
          </div>
          <div className="stat">
            <Users size={22} />
            <div>
              <span className="stat-number">1,800+</span>
              <span className="stat-label">Active Student Members</span>
            </div>
          </div>
          <div className="stat">
            <Clock size={22} />
            <div>
              <span className="stat-number">{recruitingSocieties.length}</span>
              <span className="stat-label">Recruitments Open</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section-container">
        <div className="section-header-row">
          <div>
            <div className="section-kicker">
              <Sparkles size={14} /> NOW HIRING
            </div>
            <h2>Actively Recruiting Societies</h2>
            <p className="section-subtext">
              Applications are currently open. Submit your pitch before deadlines close.
            </p>
          </div>
          <Link to="/societies?recruiting=true" className="section-view-all">
            View all recruiting <ArrowRight size={16} />
          </Link>
        </div>

        <div className="featured-societies-grid">
          {recruitingSocieties.slice(0, 3).map((soc) => {
            const color = categoryColors[soc.category] || "var(--theme)";
            return (
              <div key={soc.id} className="featured-soc-card" style={{ borderTopColor: color }}>
                <div className="featured-soc-top">
                  <div className="logo-chip">
                    <img src={soc.logo} alt={soc.name} />
                  </div>
                  <div className="featured-header-actions">
                    <span className="category-label" style={{ color }}>
                      {soc.category}
                    </span>
                    <BookmarkButton societyId={soc.id} />
                  </div>
                </div>

                <div className="featured-soc-body">
                  <Link to={`/society/${soc.id}`} className="featured-title-link">
                    <h3>{soc.name}</h3>
                  </Link>
                  <p className="featured-tagline">{soc.tagline}</p>
                  <p className="featured-desc">{soc.description}</p>

                  <div className="featured-roles-preview">
                    <span>Roles:</span>
                    <div className="roles-tags">
                      {soc.roles.slice(0, 3).map((r) => (
                        <span key={r} className="role-tag">{r}</span>
                      ))}
                      {soc.roles.length > 3 && (
                        <span className="role-tag more">+{soc.roles.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="featured-soc-footer">
                  <Link to={`/society/${soc.id}`} className="featured-details-link">
                    Details <ArrowRight size={14} />
                  </Link>
                  <Link to={`/apply/${soc.id}`} className="featured-apply-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-section-container">
        <div className="matcher-callout-banner">
          <div className="callout-badge">
            <Sparkles size={14} /> NOT SURE WHERE TO START?
          </div>
          <h2>Find Your Society Fit with our 2-Minute Matcher</h2>
          <p>
            Whether you love competitive coding, debating, athletics, or graphic design, answer 3 simple questions to discover your ideal campus crew.
          </p>
          <div className="callout-actions">
            <Link to="/find-your-fit" className="callout-primary-btn">
              Take the Quiz <ArrowRight size={16} />
            </Link>
            <Link to="/societies" className="callout-secondary-btn">
              Browse Directory
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section-container">
        <div className="section-header-row">
          <div>
            <div className="section-kicker">
              <Calendar size={14} /> CALENDAR
            </div>
            <h2>Upcoming Events &amp; Deadlines</h2>
            <p className="section-subtext">
              Orientations, recruitment closures, and workshops happening this month.
            </p>
          </div>
          <Link to="/events" className="section-view-all">
            See all events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-events-grid">
          {upcomingEvents.map((evt) => {
            const isDeadline = evt.type === "Deadline";
            return (
              <div key={evt.id} className={`home-event-card ${isDeadline ? "deadline-style" : ""}`}>
                <div className="home-event-date-badge">
                  <span className="h-month">
                    {new Date(evt.date).toLocaleString("default", { month: "short" })}
                  </span>
                  <span className="h-day">{new Date(evt.date).getDate()}</span>
                </div>
                <div className="home-event-info">
                  <div className="home-event-topline">
                    <span className="home-event-soc">{evt.societyName}</span>
                    <span className={`home-event-type ${isDeadline ? "deadline" : ""}`}>
                      {evt.type}
                    </span>
                  </div>
                  <h4>{evt.title}</h4>
                  <p>{evt.description}</p>
                  <div className="home-event-meta">
                    <span>{evt.venue}</span>
                    <span>·</span>
                    <span>{evt.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-section-container pillars-section">
        <div className="section-header-center">
          <div className="section-kicker">
            <Layers size={14} /> THE STUDENT ADVANTAGE
          </div>
          <h2>Why societies define your college years</h2>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <Users size={22} />
            </div>
            <h3>Community &amp; Lifelong Mentors</h3>
            <p>
              Connect with experienced 3rd and 4th years who have cracked FAANG internships, GSOC, and national championships.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Sparkles size={22} />
            </div>
            <h3>Real-World Project Experience</h3>
            <p>
              Move beyond textbook theory by building actual production web apps, competing in 36-hour hackathons, and publishing papers.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <Award size={22} />
            </div>
            <h3>Leadership &amp; Placement Edge</h3>
            <p>
              Organizing college fests and leading technical tracks proves communication, teamwork, and execution to top recruiters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
