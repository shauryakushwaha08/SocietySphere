import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { getApplications, getBookmarks } from "../utils/storage";
import "./Navbar.css";

function Navbar({ theme, toggleTheme, onOpenSearch }) {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [appsCount, setAppsCount] = useState(() => getApplications().length);
  const [bookmarksCount, setBookmarksCount] = useState(() => getBookmarks().length);
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    if (userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [userDropdownOpen]);

  // Prevent background scroll when mobile drawer is open and handle Escape key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

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
          <NavLink to="/societies" className={({ isActive }) => (isActive ? "active" : "")}>
            <Compass size={15} /> Societies
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "active" : "")}>
            <Calendar size={15} /> Calendar
          </NavLink>
          <NavLink to="/find-your-fit" className={({ isActive }) => (isActive ? "active" : "")}>
            <Sparkles size={15} /> Quiz
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
            id="nav-search-btn"
            type="button"
            className="search-trigger-btn"
            onClick={onOpenSearch}
            aria-label="Search societies and events"
            title="search"
          >
            <Search size={16} />
            <span className="search-trigger-text">Search</span>
          </button>

          {/* Bookmarks quick link */}
          <Link
            id="nav-bookmarks-btn"
            to="/societies?saved=true"
            className="bookmarks-nav-btn"
            aria-label={`View ${bookmarksCount} saved societies`}
            title="View saved societies"
          >
            <Bookmark size={16} fill={bookmarksCount > 0 ? "currentColor" : "none"} />
            {bookmarksCount > 0 && <span className="nav-counter-badge count-pill">{bookmarksCount}</span>}
          </Link>

          {/* User Auth Pill / Dropdown */}
          {isAuthenticated && user ? (
            <div className="nav-user-dropdown-wrap" ref={dropdownRef}>
              <button
                type="button"
                className={`nav-user-pill-btn ${userDropdownOpen ? "active" : ""}`}
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-label="Open student profile menu"
                title={`${user.name} (${user.rollNo || "NSUT Student"})`}
              >
                <div className="nav-user-avatar" aria-hidden="true">
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="nav-user-name">{user.name.split(" ")[0]}</span>
                <ChevronDown size={14} className="nav-user-chevron" />
              </button>

              {userDropdownOpen && (
                <div className="nav-user-dropdown-menu" role="menu">
                  <div className="nav-dropdown-header">
                    <div className="nav-dropdown-name">{user.name}</div>
                    <div className="nav-dropdown-roll">{user.rollNo || user.branch}</div>
                  </div>

                  <Link
                    to="/profile"
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <User size={15} />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/profile?tab=applications"
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <FileText size={15} />
                    <span>Track Applications</span>
                  </Link>

                  <Link
                    to="/profile?tab=bookmarks"
                    className="nav-dropdown-item"
                    role="menuitem"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    <Bookmark size={15} />
                    <span>Saved Societies</span>
                  </Link>

                  <button
                    type="button"
                    className="nav-dropdown-item danger"
                    role="menuitem"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              className="nav-auth-btn"
              onClick={() => openAuthModal("login")}
              aria-label="Sign in to your student profile"
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            id="nav-theme-toggle"
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle Button (Always visible on mobile) */}
          <button
            id="mobile-nav-toggle"
            type="button"
            className={`mobile-toggle-btn ${mobileMenuOpen ? "is-open" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation: Rendered via Portal at document.body level so backdrop-filter doesn't clip it */}
      {mobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="mobile-nav-overlay"
            className="mobile-drawer-overlay"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              id="mobile-nav-drawer"
              className="mobile-drawer-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="mobile-drawer-header">
                <Link to="/" className="mobile-drawer-brand" aria-label="SocietySphere Home">
                  <span className="brand-mark small">
                    <Globe size={15} />
                  </span>
                  <span className="mobile-drawer-title">
                    Society<span>Sphere</span>
                  </span>
                </Link>
                <button
                  id="mobile-drawer-close"
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
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
                  <span>Search</span>
                </button>
              </div>

              {/* Mobile Auth Card */}
              {isAuthenticated && user ? (
                <div className="mobile-drawer-auth-card">
                  <div className="mobile-auth-user-info">
                    <div className="mobile-auth-avatar">
                      {user.avatar || user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="mobile-auth-names">
                      <span className="mobile-auth-name">{user.name}</span>
                      <span className="mobile-auth-sub">{user.rollNo || user.branch}</span>
                    </div>
                  </div>
                  <div className="mobile-drawer-auth-actions">
                    <Link
                      to="/profile"
                      className="mobile-auth-btn-pill primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={14} />
                      <span>My Profile</span>
                    </Link>
                    <button
                      type="button"
                      className="mobile-auth-btn-pill"
                      style={{color: "var(--danger)"}}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                    >
                      <LogOut size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-drawer-auth-card">
                  <span style={{ fontSize: "0.85rem", color: "var(--text-soft)" }}>
                    Sign in to track applications and autofill forms.
                  </span>
                  <button
                    type="button"
                    className="mobile-auth-btn-pill primary"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal("login");
                    }}
                  >
                    <LogIn size={14} />
                    <span>Sign In to Student Account</span>
                  </button>
                </div>
              )}

              <div className="mobile-links-list">
                <NavLink to="/societies" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                  <Compass size={18} />
                  <span>Browse Societies</span>
                </NavLink>

                <NavLink to="/events" className={({ isActive }) => `mobile-nav-item ${isActive ? "active" : ""}`}>
                  <Calendar size={18} />
                  <span>Calendar & Deadlines</span>
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
                  <span>Current Theme: <strong>{theme === "dark" ? "Dark Mode" : "Light Mode"}</strong></span>
                  <button
                    type="button"
                    className="mobile-theme-btn"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                    <span>{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}

export default Navbar;
