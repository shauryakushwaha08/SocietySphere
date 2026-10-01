import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  FileText,
  Bookmark,
  Calendar,
  ExternalLink,
  Edit3,
  LogOut,
  Plus,
  X,
  Check,
  Compass,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import {
  getApplications,
  deleteApplication,
  getBookmarks,
  toggleBookmark,
} from "../utils/storage";
import societies from "../data/societies";
import { categoryColors } from "../utils/categoryStyles";
import { isRecruitmentOpen } from "../utils/recruitmentUtils"
import { NSUT_BRANCHES, ACADEMIC_YEARS } from "../utils/auth";
import "./Profile.css";

const VALID_TABS = ["applications", "bookmarks", "details"];

export default function Profile() {
  const { user, isAuthenticated, logout, updateUser, openAuthModal } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabsSectionRef = useRef(null);

  const tabParam = searchParams.get("tab");
  const activeTab = VALID_TABS.includes(tabParam) ? tabParam : "applications";

  const scrollToTabs = () => {
    if (tabsSectionRef.current) {
      const yOffset = -80;
      const y = tabsSectionRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  // Synchronize activeTab with URL search params and optionally scroll down
  const handleTabChange = (newTab, shouldScroll = false) => {
    setSearchParams({ tab: newTab });
    if (shouldScroll) {
      setTimeout(scrollToTabs, 50);
    }
  };

  // Scroll to tabs section if navigated to with a specific tab parameter
  useEffect(() => {
    if (tabParam && VALID_TABS.includes(tabParam)) {
      const timer = setTimeout(() => {
        scrollToTabs();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [tabParam]);

  // Listen for direct navigation and scroll events from Navbar dropdown
  useEffect(() => {
    function handleProfileNav(e) {
      const targetTab = e.detail?.tab;
      if (targetTab && VALID_TABS.includes(targetTab)) {
        setSearchParams({ tab: targetTab });
        setTimeout(() => {
          scrollToTabs();
        }, 50);
      }
    }
    window.addEventListener("societysphere:navigate-profile-tab", handleProfileNav);
    return () => window.removeEventListener("societysphere:navigate-profile-tab", handleProfileNav);
  }, [setSearchParams]);

  // State for applications and bookmarks
  const [applications, setApplications] = useState(() => getApplications());
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  // Edit details form state initialized directly from active user
  const [formData, setFormData] = useState(() => ({
    name: user?.name || "",
    rollNo: user?.rollNo || "",
    branch: user?.branch || NSUT_BRANCHES[0],
    year: user?.year || ACADEMIC_YEARS[0],
    phone: user?.phone || "",
    cgpa: user?.cgpa || "",
    bio: user?.bio || "",
    portfolio: user?.portfolio || "",
    linkedin: user?.linkedin || "",
    skills: user?.skills || [],
  }));
  const [newSkillInput, setNewSkillInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load applications and bookmarks
  useEffect(() => {
    const refreshData = () => {
      setApplications(getApplications());
      setBookmarks(getBookmarks());
    };

    refreshData();
    window.addEventListener("storage", refreshData);
    window.addEventListener("societysphere:bookmarks-updated", refreshData);

    return () => {
      window.removeEventListener("storage", refreshData);
      window.removeEventListener("societysphere:bookmarks-updated", refreshData);
    };
  }, []);

  const handleWithdrawApplication = (appId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      const updated = deleteApplication(appId);
      setApplications(updated);
    }
  };

  const handleRemoveBookmark = (socId) => {
    const updated = toggleBookmark(socId);
    setBookmarks(updated);
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const clean = newSkillInput.trim();
    if (clean && !formData.skills.includes(clean)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, clean],
      }));
      setNewSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // If user is not logged in, render the Guest State
  if (!isAuthenticated || !user) {
    return (
      <div className="profile-page">
        <div className="profile-guest-card">
          <div className="profile-guest-icon">
            <GraduationCap size={36} />
          </div>
          <h1 className="profile-guest-title">Student Profile &amp; Portal</h1>
          <p className="profile-guest-desc">
            Sign in with your NSUT student credentials to track your submitted applications, view recruitment stages, manage bookmarked societies, and autofill forms.
          </p>
          <div className="profile-guest-actions">
            <button
              type="button"
              className="profile-action-btn primary"
              onClick={() => openAuthModal("login")}
            >
              Sign In to Account
            </button>
            <button
              type="button"
              className="profile-action-btn secondary"
              onClick={() => openAuthModal("register")}
            >
              Create New Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const submittedCount = applications.length;
  const inReviewCount = applications.filter(
    (a) => a.status === "Submitted" || a.status === "Under Review" || a.status === "Interview Scheduled"
  ).length;
  const bookmarkedSocieties = societies.filter((s) => bookmarks.includes(s.id));

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Hero / Header Card */}
        <section className="profile-hero-card" aria-label="Student Information">
          <div className="profile-hero-top">
            <div className="profile-avatar-group">
              <div className="profile-top">
                <div className="profile-avatar-circle" aria-hidden="true">
                  {user.avatar || user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="profile-hero-actions">
                  <button
                    type="button"
                    className="profile-action-btn secondary"
                    onClick={() => handleTabChange("details", true)}
                    title="Edit student profile"
                  >
                    <Edit3 size={15} />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    type="button"
                    className="profile-action-btn danger"
                    onClick={logout}
                    title="Sign out of student session"
                  >
                    <LogOut size={15} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-meta-info">
              <div className="profile-name-row">
                <h1 className="profile-name">{user.name}</h1>
              </div>
              <div className="profile-student-chips">
                <span className="profile-chip">
                  Roll: <code>{user.rollNo || "Not specified"}</code>
                </span>
                <span className="profile-chip">{user.branch}</span>
                <span className="profile-chip">{user.year}</span>
                {user.cgpa && (
                  <span className="profile-chip">
                    CGPA: <strong>{user.cgpa}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {user.bio && (
            <div className="profile-bio-box">
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-links-row">
            {user.email && (
              <span className="profile-chip">
                Email: <strong>{user.email}</strong>
              </span>
            )}
            {user.phone && (
              <span className="profile-chip">
                Phone: <strong>{user.phone}</strong>
              </span>
            )}
            {user.portfolio && (
              <a
                href={user.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-ext-link"
              >
                <span>Portfolio / GitHub</span>
                <ExternalLink size={13} />
              </a>
            )}
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-ext-link"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="profile-stats-grid" aria-label="Recruitment Summary">
          <div
            className="profile-stat-box clickable"
            role="button"
            tabIndex={0}
            onClick={() => handleTabChange("applications", true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTabChange("applications", true)}
            title="Click to view applications pipeline"
          >
            <div
              className="profile-stat-icon"
              style={{ background: "rgba(56, 189, 248, 0.14)", color: "#38bdf8" }}
            >
              <FileText size={22} />
            </div>
            <div className="profile-stat-info">
              <span className="profile-stat-val">{submittedCount}</span>
              <span className="profile-stat-label">Applications</span>
            </div>
          </div>

          <div
            className="profile-stat-box clickable"
            role="button"
            tabIndex={0}
            onClick={() => handleTabChange("applications", true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTabChange("applications", true)}
            title="Click to view in-review applications"
          >
            <div
              className="profile-stat-icon"
              style={{ background: "rgba(232, 179, 57, 0.15)", color: "var(--important)" }}
            >
              <Clock size={22} />
            </div>
            <div className="profile-stat-info">
              <span className="profile-stat-val">{inReviewCount}</span>
              <span className="profile-stat-label">In Review / Stages</span>
            </div>
          </div>

          <div
            className="profile-stat-box clickable"
            role="button"
            tabIndex={0}
            onClick={() => handleTabChange("bookmarks", true)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleTabChange("bookmarks", true)}
            title="Click to view saved clubs and societies"
          >
            <div
              className="profile-stat-icon"
              style={{ background: "rgba(61, 220, 151, 0.14)", color: "var(--theme)" }}
            >
              <Bookmark size={22} />
            </div>
            <div className="profile-stat-info">
              <span className="profile-stat-val">{bookmarks.length}</span>
              <span className="profile-stat-label">Saved Clubs &amp; Societies</span>
            </div>
          </div>
        </section>

        {/* Tabs Bar */}
        <nav
          ref={tabsSectionRef}
          id="profile-tabs-section"
          className="profile-tabs-bar"
          role="tablist"
        >
          <button
            type="button"
            className={`profile-tab-item ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => handleTabChange("applications")}
            role="tab"
            aria-selected={activeTab === "applications"}
          >
            <FileText size={16} />
            <span>Applications Pipeline</span>
            <span className="profile-tab-count">{applications.length}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-item ${activeTab === "bookmarks" ? "active" : ""}`}
            onClick={() => handleTabChange("bookmarks")}
            role="tab"
            aria-selected={activeTab === "bookmarks"}
          >
            <Bookmark size={16} />
            <span>Saved Clubs</span>
            <span className="profile-tab-count">{bookmarks.length}</span>
          </button>

          <button
            type="button"
            className={`profile-tab-item ${activeTab === "details" ? "active" : ""}`}
            onClick={() => handleTabChange("details")}
            role="tab"
            aria-selected={activeTab === "details"}
          >
            <Edit3 size={16} />
            <span>Academic &amp; Profile Details</span>
          </button>
        </nav>

        {/* Tab 1: Applications Pipeline */}
        {activeTab === "applications" && (
          <div className="profile-tab-panel">
            {applications.length === 0 ? (
              <div className="profile-tab-empty">
                <FileText size={36} style={{ color: "var(--text-muted)" }} />
                <h3>No Applications Submitted Yet</h3>
                <p>
                  You haven&apos;t submitted any society applications. Browse open recruitment drives across NSUT societies and apply in seconds.
                </p>
                <Link to="/societies" className="profile-action-btn primary">
                  <Compass size={16} />
                  <span>Browse Open Societies</span>
                </Link>
              </div>
            ) : (
              <div className="profile-apps-list">
                {applications.map((app) => {
                  const society = societies.find((s) => s.id === app.societyId);
                  const color = society ? categoryColors[society.category] : "var(--theme)";
                  const formattedDate = app.submittedAt
                    ? new Date(app.submittedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recently";

                  // Status style helper
                  const statusClass = (app.status || "Submitted")
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  return (
                    <article
                      key={app.id}
                      className="profile-app-card"
                      style={{ borderLeftColor: color }}
                    >
                      <div className="profile-app-main">
                        <div className="profile-app-society">
                          <div className="profile-app-logo">
                            {society?.logo ? (
                              <img src={society.logo} alt={app.societyName} />
                            ) : (
                              <Compass size={22} />
                            )}
                          </div>
                          <div className="profile-app-details">
                            <Link to={`/society/${app.societyId}`}>
                              <h3>{app.societyName}</h3>
                            </Link>
                            <span className="profile-app-role">
                              Role Applied: <strong>{app.role || "Member"}</strong>
                            </span>
                          </div>
                        </div>

                        <div className="profile-app-badge-group">
                          {society?.category && (
                            <span
                              className="profile-chip"
                              style={{ color, borderColor: `${color}40` }}
                            >
                              {society.category}
                            </span>
                          )}
                          <span className={`app-status-pill ${statusClass}`}>
                            {app.status === "Selected" && <CheckCircle2 size={13} />}
                            {app.status === "Under Review" && <Clock size={13} />}
                            {app.status === "Interview Scheduled" && <Calendar size={13} />}
                            <span>{app.status || "Submitted"}</span>
                          </span>
                        </div>
                      </div>

                      <div className="profile-app-footer">
                        <span>Submitted on {formattedDate}</span>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                          <Link
                            to={`/applications`}
                            className="profile-ext-link"
                          >
                            <span>View Application</span>
                            <ArrowRight size={13} />
                          </Link>
                          <button
                            type="button"
                            className="profile-app-withdraw-btn"
                            onClick={() => handleWithdrawApplication(app.id)}
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Societies */}
        {activeTab === "bookmarks" && (
          <div className="profile-tab-panel">
            {bookmarkedSocieties.length === 0 ? (
              <div className="profile-tab-empty">
                <Bookmark size={36} style={{ color: "var(--text-muted)" }} />
                <h3>No Bookmarked Societies</h3>
                <p>
                  Bookmark societies you are interested in keeping track of during campus recruitment cycles.
                </p>
                <Link to="/societies" className="profile-action-btn primary">
                  <Compass size={16} />
                  <span>Explore Directory</span>
                </Link>
              </div>
            ) : (
              <div className="profile-bookmarks-grid">
                {bookmarkedSocieties.map((soc) => {
                  const color = categoryColors[soc.category] || "var(--theme)";
                  const recruitmentOpen = isRecruitmentOpen(soc.recruitmentDeadline);
                  return (
                    <div key={soc.id} className="profile-bookmark-card">
                      <div className="profile-bookmark-header">
                        <div className="profile-bookmark-logo">
                          <img src={soc.logo} alt={soc.name} />
                        </div>
                        <div>
                          <Link to={`/society/${soc.id}`}>
                            <h3 className="profile-bookmark-title">{soc.name}</h3>
                          </Link>
                          <span
                            className="profile-bookmark-cat"
                            style={{ color }}
                          >
                            {soc.category}
                          </span>
                        </div>
                      </div>

                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-soft)",
                          lineHeight: 1.4,
                          margin: 0,
                        }}
                      >
                        {soc.tagline || soc.description?.slice(0, 100)}...
                      </p>

                      <div className="profile-bookmark-actions">
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {recruitmentOpen ? (
                            <Link
                              to={`/apply/${soc.id}`}
                              className="profile-action-btn primary"
                              style={{ padding: "0.4rem 0.8rem", fontSize: "0.8125rem" }}
                            >
                              Apply Now
                            </Link>
                          ) : (
                            <span
                              className="profile-chip"
                              style={{ color: "var(--text-muted)" }}
                            >
                              Closed
                            </span>
                          )}
                          <Link
                            to={`/society/${soc.id}`}
                            className="profile-action-btn secondary"
                            style={{ padding: "0.4rem 0.8rem", fontSize: "0.8125rem" }}
                          >
                            View
                          </Link>
                        </div>
                        <button
                          type="button"
                          className="profile-app-withdraw-btn"
                          onClick={() => handleRemoveBookmark(soc.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Edit Academic & Profile Details */}
        {activeTab === "details" && (
          <div className="profile-tab-panel">
            <form className="profile-edit-form" onSubmit={handleSaveProfile}>
              <div className="profile-form-section-title">
                Personal &amp; Contact Information
              </div>

              <div className="profile-form-grid">
                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-name">
                    Full Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    className="profile-field-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-roll">
                    University Roll Number
                  </label>
                  <input
                    id="edit-roll"
                    type="text"
                    className="profile-field-input"
                    value={formData.rollNo}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNo: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-phone">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="edit-phone"
                    type="tel"
                    className="profile-field-input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-cgpa">
                    CGPA / Academic Score
                  </label>
                  <input
                    id="edit-cgpa"
                    type="text"
                    className="profile-field-input"
                    value={formData.cgpa}
                    onChange={(e) =>
                      setFormData({ ...formData, cgpa: e.target.value })
                    }
                    placeholder="e.g. 8.85"
                  />
                </div>
              </div>

              <div className="profile-form-section-title" style={{ marginTop: "1rem" }}>
                Academic Major &amp; Year
              </div>

              <div className="profile-form-grid">
                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-branch">
                    Branch / Department
                  </label>
                  <select
                    id="edit-branch"
                    className="profile-field-select"
                    value={formData.branch}
                    onChange={(e) =>
                      setFormData({ ...formData, branch: e.target.value })
                    }
                  >
                    {NSUT_BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-year">
                    Current Academic Year
                  </label>
                  <select
                    id="edit-year"
                    className="profile-field-select"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                  >
                    {ACADEMIC_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="profile-form-section-title" style={{ marginTop: "1rem" }}>
                Portfolio &amp; External Profiles
              </div>

              <div className="profile-form-grid">
                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-portfolio">
                    GitHub / Portfolio Website
                  </label>
                  <input
                    id="edit-portfolio"
                    type="url"
                    className="profile-field-input"
                    value={formData.portfolio}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="profile-field-group">
                  <label className="profile-field-label" htmlFor="edit-linkedin">
                    LinkedIn Profile URL
                  </label>
                  <input
                    id="edit-linkedin"
                    type="url"
                    className="profile-field-input"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
              </div>

              <div className="profile-field-group">
                <label className="profile-field-label" htmlFor="edit-bio">
                  Student Bio / About Me
                </label>
                <textarea
                  id="edit-bio"
                  className="profile-field-textarea"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell campus societies about your passions, past projects, or why you want to join..."
                />
              </div>

              <div className="profile-field-group">
                <label className="profile-field-label">
                  Skills &amp; Interests Tags
                </label>
                <div className="profile-skills-row">
                  {formData.skills.map((s) => (
                    <span key={s} className="profile-skill-chip">
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(s)}
                        title={`Remove ${s}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <input
                    type="text"
                    className="profile-field-input"
                    style={{ maxWidth: "260px" }}
                    placeholder="Add a skill (e.g. React, Video Editing)"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="profile-action-btn secondary"
                    onClick={handleAddSkill}
                  >
                    <Plus size={14} />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit" className="profile-action-btn primary">
                  <Check size={16} />
                  <span>Save Profile Changes</span>
                </button>
                {saveSuccess && (
                  <span className="profile-save-feedback">
                    <CheckCircle2 size={16} />
                    <span>Profile saved successfully!</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
