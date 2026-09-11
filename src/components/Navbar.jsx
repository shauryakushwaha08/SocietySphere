import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Globe,
  Search,
  Menu,
  X,
  Sparkles,
  Calendar,
  Compass,
  FileText,
  Bookmark,
} from "lucide-react";
import { getApplications, getBookmarks } from "../utils/storage";
import "./Navbar.css";

function Navbar({ theme, toggleTheme, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appsCount, setAppsCount] = useState(() => getApplications().length);
  const [bookmarksCount, setBookmarksCount] = useState(() => getBookmarks().length);
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  // Sync counts dynamically
  useEffect(() => {
    const updateCounts = () => {
      setAppsCount(getApplications().length);
      setBookmarksCount(getBookmarks().length);
    };

    window.addEventListener("storage", updateCounts);
    window.addEventListener("societysphere:bookmarks-updated", (e) => {
      if (e.detail) setBookmarksCount(e.detail.length);
    });

    return () => {
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        {/* Brand */}
        <Link to="/" className="brand" aria-label="SocietySphere Home">
          <span className="brand-mark">
            <Globe size={18} />
          </span>
          <div className="brand-text-wrapper">
            <span className="brand-title">
              Society<span>Sphere</span>
            </span>
            <span className="brand-badge">NSUT CAMPUS</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-desktop-links" role="menubar">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/societies" className={({ isActive }) => (isActive ? "active" : "")}>
            <Compass size={15} /> Societies
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
            <Calendar size={15} /> Events & Deadlines
          </NavLink>
          <NavLink to="/find-your-fit" className={({ isActive }) => (isActive ? "active" : "")}>
            <Sparkles size={15} /> Find Your Fit
          </NavLink>
          <NavLink to="/applications" className={({ isActive }) => `apps-link ${isActive ? "active" : ""}`}>
            <FileText size={15} /> Applications
            {appsCount > 0 && <span className="nav-counter-badge">{appsCount}</span>}
          </NavLink>
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Quick Search Button */}
          <button
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            aria-label="Search societies and events"
            title="Press ⌘K or / to search"
          >
            <Search size={16} />
            <span className="search-trigger-text">Search...</span>
            <kbd className="search-shortcut">Ctrl+K</kbd>
          </button>

          {/* Bookmarks quick link */}
          <Link
            to="/societies?saved=true"
            className="bookmarks-nav-btn"
            aria-label={`View ${bookmarksCount} saved societies`}
            title="View saved societies"
          >
            <Bookmark size={16} fill={bookmarksCount > 0 ? "currentColor" : "none"} />
            {bookmarksCount > 0 && <span className="nav-counter-badge count-pill">{bookmarksCount}</span>}
          </Link>

          {/* Theme Toggle */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title">Navigation</span>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-search-bar">
              <button
                type="button"
                className="mobile-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
              >
                <Search size={16} />
                <span>Search societies & events...</span>
                <span className="search-pill">Open</span>
              </button>
            </div>

            <div className="mobile-links-list">
              <NavLink to="/" end className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <Globe size={18} />
                <span>Home</span>
              </NavLink>

              <NavLink to="/societies" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <Compass size={18} />
                <span>Browse Societies</span>
              </NavLink>

              <NavLink to="/events" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <Calendar size={18} />
                <span>Events & Deadlines</span>
              </NavLink>

              <NavLink to="/find-your-fit" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <Sparkles size={18} />
                <span>Find Your Fit Quiz</span>
              </NavLink>

              <NavLink to="/applications" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <FileText size={18} />
                <span>My Applications</span>
                {appsCount > 0 && <span className="mobile-nav-badge">{appsCount}</span>}
              </NavLink>

              <NavLink to="/societies?saved=true" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                <Bookmark size={18} />
                <span>Saved Societies</span>
                {bookmarksCount > 0 && <span className="mobile-nav-badge">{bookmarksCount}</span>}
              </NavLink>
            </div>

            <div className="mobile-drawer-footer">
              <div className="theme-toggle-row">
                <span>Theme: {theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
                <button
                  type="button"
                  className="mobile-theme-btn"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                  <span>{theme === "dark" ? "Switch to Light" : "Switch to Dark"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
