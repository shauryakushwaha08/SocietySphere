import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Compass,
  Calendar,
  Sparkles,
  FileText,
  Bookmark,
  Search,
  ArrowUp,
  MapPin,
  ExternalLink,
  Code2,
  Palette,
  Briefcase,
  BookOpen,
  HeartHandshake,
  Trophy,
  Car,
  Heart,
  ChevronDown,
} from "lucide-react";
import "./Footer.css";

const CATEGORY_LINKS = [
  { name: "Technical", code: "TECH", icon: Code2, color: "var(--tech)" },
  { name: "Cultural", code: "CULT", icon: Palette, color: "var(--cultural)" },
  { name: "Entrepreneurship", code: "ENT", icon: Briefcase, color: "var(--entrepreneurship)" },
  { name: "Literary", code: "LIT", icon: BookOpen, color: "var(--literary)" },
  { name: "Social", code: "SOC", icon: HeartHandshake, color: "var(--social)" },
  { name: "Sports", code: "SPRT", icon: Trophy, color: "var(--sports)" },
  { name: "Automotive", code: "AUTO", icon: Car, color: "var(--automotive)" },
];

export default function Footer({ onOpenSearch }) {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState({
    nav: false,
    domains: false,
    portals: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="site-footer" role="contentinfo">
      {/* Top Banner / Pulse Bar */}
      <div className="footer-pulse-banner">
        <div className="footer-pulse-container">
          <div className="pulse-item">
            <span className="live-indicator-dot" />
            <span className="pulse-text">
              <strong>Society Recruitment Portal</strong> · 49 Societies &amp; Chapters Active
            </span>
          </div>
          <div className="pulse-actions">
            {onOpenSearch && (
              <button
                type="button"
                className="footer-search-trigger"
                onClick={onOpenSearch}
                title="Press Ctrl+K to search"
                id="footer-search-btn"
              >
                <Search size={14} />
                <span className="search-label-desktop">Search</span>
                <kbd>Ctrl+K</kbd>
              </button>
            )}
            <button
              type="button"
              className="footer-back-to-top-btn"
              onClick={scrollToTop}
              title="Scroll to top of page"
              aria-label="Back to top"
              id="footer-top-btn"
            >
              <span>Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="footer-main-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Campus Identity */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand" aria-label="SocietySphere Home" id="footer-brand-link">
            <span className="footer-brand-mark">
                <Globe size={20} />
              </span>
              <div className="footer-brand-text">
                <span className="brand-name">
                  Society<span>Sphere</span>
                </span>
                <span className="brand-sub">NSUT CAMPUS</span>
              </div>
            </Link>

            <p className="footer-mission">
              The platform for exploring societies, tracking recruitment cycles, and finding open roles across all departments at Netaji Subhas University of Technology.
            </p>

            <div className="footer-campus-info">
              <div className="campus-info-row">
                <MapPin size={15} className="campus-icon" />
                <span>Sector 3, Dwarka, New Delhi — 110078</span>
              </div>
            </div>

            <div className="footer-badges-wrap">
              <span className="footer-pill-chip">49 Student Societies</span>
              <span className="footer-pill-chip">7 Activity Domains</span>
              <span className="footer-pill-chip">All 4 Years</span>
              </div>
          </div>
          
          {/* Column 2: Quick Navigation (Collapsible on Mobile) */}
          <div className={`footer-col footer-collapsible-col ${openSections.nav ? "is-open" : ""}`}>
            <button
              type="button"
              className="footer-col-header-btn"
              onClick={() => toggleSection("nav")}
              aria-expanded={openSections.nav}
              aria-controls="footer-nav-content"
              id="footer-nav-btn"
            >
              <h4 className="footer-col-title">Navigation</h4>
              <ChevronDown size={16} className="footer-col-toggle-icon" />
            </button>
            <div className="footer-col-content" id="footer-nav-content">
              <ul className="footer-links-list">
                <li>
                  <Link to="/societies">
                    <Compass size={14} />
                    <span>All Societies Directory</span>
                  </Link>
                </li>
                <li>
                  <Link to="/events">
                    <Calendar size={14} />
                    <span>Upcoming Events &amp; Fests</span>
                  </Link>
                </li>
                <li>
                  <Link to="/find-your-fit">
                    <Sparkles size={14} />
                    <span>Society Match Quiz</span>
                  </Link>
                </li>
                <li>
                  <Link to="/applications">
                    <FileText size={14} />
                    <span>My Applications Tracker</span>
                  </Link>
                </li>
                <li>
                  <Link to="/societies?saved=true">
                    <Bookmark size={14} />
                    <span>Saved Bookmarks</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Domains & Categories (Collapsible on Mobile) */}
          <div className={`footer-col footer-collapsible-col ${openSections.domains ? "is-open" : ""}`}>
            <button
              type="button"
              className="footer-col-header-btn"
              onClick={() => toggleSection("domains")}
              aria-expanded={openSections.domains}
              aria-controls="footer-domains-content"
              id="footer-domains-btn"
            >
              <h4 className="footer-col-title">Domains</h4>
              <ChevronDown size={16} className="footer-col-toggle-icon" />
            </button>
            <div className="footer-col-content" id="footer-domains-content">
              <ul className="footer-links-list domain-links">
                {CATEGORY_LINKS.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <li key={cat.name}>
                      <Link to={`/societies?category=${encodeURIComponent(cat.name)}`}>
                        <span
                          className="cat-dot-indicator"
                          style={{ backgroundColor: cat.color }}
                        />
                        <IconComponent size={14} style={{ color: cat.color }} />
                        <span>{cat.name}</span>
                        <span className="cat-code-badge">{cat.code}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Column 4: University Portals (Collapsible on Mobile) */}
          <div className={`footer-col footer-collapsible-col ${openSections.portals ? "is-open" : ""}`}>
            <button
              type="button"
              className="footer-col-header-btn"
              onClick={() => toggleSection("portals")}
              aria-expanded={openSections.portals}
              aria-controls="footer-portals-content"
              id="footer-portals-btn"
            >
              <h4 className="footer-col-title">Campus Portals</h4>
              <ChevronDown size={16} className="footer-col-toggle-icon" />
            </button>
            <div className="footer-col-content" id="footer-portals-content">
              <ul className="footer-links-list">
                <li>
                  <a
                    href="https://nsut.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-campus-link"
                  >
                    <span>NSUT Official Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.imsnsit.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-campus-link"
                  >
                    <span>IMS Student Portal</span>
                    <ExternalLink size={13} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://placements.nsut.ac.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-campus-link"
                  >
                    <span>Training &amp; Placement Cell</span>
                    <ExternalLink size={13} />
                  </a>
                </li>
                <li>
                  <Link to="/events?type=Fest">
                    <span>Moksha &amp; Innovision Fests</span>
                  </Link>
                </li>
                <li>
                  <Link to="/societies?filter=recruiting">
                    <span>Recruiting Societies</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-student-callout">
              <span className="callout-heading">Society Lead or POC?</span>
              <p className="callout-text">
                Need to update club brochure or recruitment tracks? Connect with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Credits Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <div className="footer-copyright">
            <span>
              &copy; {currentYear} <strong>SocietySphere</strong> · NSUT
            </span>
            <span className="footer-sep" aria-hidden="true">·</span>
            <span className="footer-subtext">Designed for NSUT students</span>
          </div>

          <div className="footer-credit">
            <span>Made with</span>
            <Heart size={13} className="heart-icon" />
            <span>by Shaurya Kushwaha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
