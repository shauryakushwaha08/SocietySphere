import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  GraduationCap,
  Sparkles,
  Phone,
  Globe,
  AlertCircle,
  Hash,
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { NSUT_BRANCHES, ACADEMIC_YEARS } from "../utils/auth";
import "./AuthModal.css";

function AuthModalDialog({ initialTab }) {
  const { closeAuthModal, login, register, loginDemo } = useAuth();
  const [tab, setTab] = useState(initialTab || "login");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: NSUT_BRANCHES[0],
    year: ACADEMIC_YEARS[0],
    phone: "",
    portfolio: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!loginEmail.trim()) {
        throw new Error("Please enter your college or personal email.");
      }
      await login(loginEmail, loginPassword);
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (!registerData.name.trim()) throw new Error("Full name is required.");
      if (!registerData.email.trim()) throw new Error("Email address is required.");
      if (!registerData.rollNo.trim()) throw new Error("University roll number is required.");
      await register(registerData);
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await loginDemo();
    } catch (err) {
      setError(err.message || "Failed to sign in as demo student.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-modal-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="auth-modal-header">
        <div className="auth-header-info">
          <span className="auth-badge">
            <GraduationCap size={13} />
            <span>NSUT Student Identity</span>
          </span>
          <h2 className="auth-modal-title" id="auth-modal-title">
            {tab === "login" ? "Student Sign In" : "Register Student Profile"}
          </h2>
          <p className="auth-modal-subtitle">
            {tab === "login"
              ? "Access your recruitment pipeline, bookmarks, and auto-filled applications."
              : "Create your verified NSUT student profile to easily apply across campus societies."}
          </p>
        </div>
        <button
          type="button"
          className="auth-close-btn"
          onClick={closeAuthModal}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="auth-tabs-row" role="tablist">
        <button
          type="button"
          className={`auth-tab-btn ${tab === "login" ? "active" : ""}`}
          onClick={() => {
            setTab("login");
            setError("");
          }}
          role="tab"
          aria-selected={tab === "login"}
        >
          <LogIn size={15} />
          <span>Sign In</span>
        </button>
        <button
          type="button"
          className={`auth-tab-btn ${tab === "register" ? "active" : ""}`}
          onClick={() => {
            setTab("register");
            setError("");
          }}
          role="tab"
          aria-selected={tab === "register"}
        >
          <UserPlus size={15} />
          <span>New Student</span>
        </button>
      </div>

      <div className="auth-body">
        {/* Quick Demo Switcher */}
        <div className="demo-account-box">
          <div className="demo-account-text">
            <span className="demo-account-title">
              <Sparkles size={14} style={{ color: "var(--theme)" }} />
              Instant Demo Profile
            </span>
            <span className="demo-account-desc">
              Sign in as <strong>John Doe</strong> (2nd Year CSE) with preloaded records.
            </span>
          </div>
          <button
            type="button"
            className="demo-action-btn"
            onClick={handleDemoLogin}
            disabled={submitting}
          >
            1-Click Sign In
          </button>
        </div>

        <div className="auth-divider">or enter details</div>

        {error && (
          <div className="auth-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {tab === "login" ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">
                Student Email
              </label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="login-email"
                  type="email"
                  className="auth-input"
                  placeholder="e.g. yourname.ug24@nsut.ac.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="login-password"
                  type="password"
                  className="auth-input"
                  placeholder="Enter password (optional for demo)"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={submitting}
            >
              <LogIn size={16} />
              <span>{submitting ? "Signing In..." : "Sign In to Profile"}</span>
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="auth-form-grid">
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-name">
                  Full Name *
                </label>
                <div className="auth-input-wrap">
                  <User size={16} className="auth-input-icon" />
                  <input
                    id="register-name"
                    type="text"
                    className="auth-input"
                    placeholder="e.g. Aarav Sharma"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-roll">
                  Roll Number *
                </label>
                <div className="auth-input-wrap">
                  <Hash size={16} className="auth-input-icon" />
                  <input
                    id="register-roll"
                    type="text"
                    className="auth-input"
                    placeholder="e.g. 2025UCS1020"
                    value={registerData.rollNo}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, rollNo: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="register-email">
                University / Personal Email *
              </label>
              <div className="auth-input-wrap">
                <Mail size={16} className="auth-input-icon" />
                <input
                  id="register-email"
                  type="email"
                  className="auth-input"
                  placeholder="e.g. student@nsut.ac.in"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="auth-form-grid">
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-branch">
                  Branch / Major
                </label>
                <select
                  id="register-branch"
                  className="auth-select no-icon"
                  value={registerData.branch}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, branch: e.target.value })
                  }
                >
                  {NSUT_BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-year">
                  Academic Year
                </label>
                <select
                  id="register-year"
                  className="auth-select no-icon"
                  value={registerData.year}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, year: e.target.value })
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

            <div className="auth-form-grid">
              <div className="auth-field">
                <label className="auth-label" htmlFor="register-phone">
                  Contact / WhatsApp
                </label>
                <div className="auth-input-wrap">
                  <Phone size={16} className="auth-input-icon" />
                  <input
                    id="register-phone"
                    type="tel"
                    className="auth-input"
                    placeholder="+91 98765 43210"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="register-portfolio">
                  Portfolio / GitHub
                </label>
                <div className="auth-input-wrap">
                  <Globe size={16} className="auth-input-icon" />
                  <input
                    id="register-portfolio"
                    type="url"
                    className="auth-input"
                    placeholder="https://github.com/..."
                    value={registerData.portfolio}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, portfolio: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="register-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <Lock size={16} className="auth-input-icon" />
                <input
                  id="register-password"
                  type="password"
                  className="auth-input"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={submitting}
            >
              <UserPlus size={16} />
              <span>{submitting ? "Creating Account..." : "Complete Registration"}</span>
            </button>
          </form>
        )}
      </div>

      <div className="auth-modal-footer">
        {tab === "login" ? (
          <span>
            Don&apos;t have a student profile yet?{" "}
            <button
              type="button"
              onClick={() => {
                setTab("register");
                setError("");
              }}
            >
              Create one now
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
              }}
            >
              Sign in here
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

export default function AuthModal() {
  const { authModal, closeAuthModal } = useAuth();

  // Handle escape key
  useEffect(() => {
    if (!authModal.isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [authModal.isOpen, closeAuthModal]);

  if (!authModal.isOpen) return null;

  return createPortal(
    <div
      className="auth-modal-overlay"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <AuthModalDialog
        key={`${authModal.mode || "login"}_${authModal.isOpen}`}
        initialTab={authModal.mode || "login"}
      />
    </div>,
    document.body
  );
}
