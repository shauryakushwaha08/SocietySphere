import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send, Save, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import societies from "../data/societies";
import {
  saveApplication,
  getDraft,
  saveDraft,
  clearDraft,
} from "../utils/storage";
import "./Apply.css";

function Apply() {
  const { id } = useParams();
  const society = societies.find((s) => s.id === id);

  const [formData, setFormData] = useState(() => {
    const defaultData = {
      name: "",
      year: "",
      branch: "",
      role: "",
      phone: "",
      portfolio: "",
      why: "",
    };
    if (society) {
      const existingDraft = getDraft(society.id);
      if (existingDraft) {
        return { ...defaultData, ...existingDraft };
      }
    }
    return defaultData;
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [draftNotice, setDraftNotice] = useState(() => {
    return society ? Boolean(getDraft(society.id)) : false;
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const nextForm = { ...formData, [name]: value };
    setFormData(nextForm);
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Auto-save draft
    if (society) {
      saveDraft(society.id, nextForm);
    }
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.branch.trim()) {
      newErrors.branch = "Branch / Major is required";
    }
    if (!formData.year.trim()) {
      newErrors.year = "Please choose your academic year";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Please select an open role";
    }
    if (formData.phone.trim() && !/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid contact number";
    }
    if (!formData.why.trim() || formData.why.trim().length < 20) {
      newErrors.why = "Please write at least 20 characters explaining your interest";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      saveApplication({
        ...formData,
        societyId: society.id,
        societyName: society.name,
      });
      clearDraft(society.id);
      setSubmitted(true);
    }
  }

  if (!society) {
    return (
      <main className="page-container empty-page">
        <h1>Society not found</h1>
        <p>The society you are trying to apply for does not exist.</p>
        <Link to="/societies" className="secondary-btn">
          Back to societies
        </Link>
      </main>
    );
  }

  if (!society.recruitmentOpen) {
    return (
      <main className="page-container empty-page">
        <h1>Recruitment Closed</h1>
        <p>{society.name} is not accepting new applications at this time.</p>
        <Link to={`/society/${society.id}`} className="secondary-btn">
          View {society.name} profile
        </Link>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="page-container success-page">
        <div className="success-icon">
          <CheckCircle2 size={40} />
        </div>
        <div className="section-kicker">APPLICATION SUBMITTED</div>
        <h1>You&apos;re officially on the candidate list!</h1>
        <p>
          Your application for <strong>{formData.role}</strong> at <strong>{society.name}</strong> has been saved. The society team will reach out regarding interviews and tasks.
        </p>
        <div className="success-actions">
          <Link to="/applications" className="submit-app-btn">
            View My Applications
          </Link>
          <Link to="/societies" className="secondary-btn">
            Explore More Societies
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container apply-page">
      <Link to={`/society/${id}`} className="back-link">
        <ArrowLeft size={16} /> Back to {society.name}
      </Link>

      <div className="apply-layout">
        {/* Left Side Info Card */}
        <aside className="apply-intro">
          <div className="logo-chip large">
            <img src={society.logo} alt={`${society.name} logo`} />
          </div>
          <div className="section-kicker">APPLY TO JOIN</div>
          <h1>{society.name}</h1>
          <p className="apply-intro-sub">{society.tagline}</p>
          <p className="apply-intro-desc">{society.description}</p>

          <div className="apply-notes-block">
            <div className="form-note">
              <CheckCircle2 size={16} /> Fast 2-minute submission
            </div>
            <div className="form-note">
              <Save size={16} /> Automatic local draft recovery
            </div>
            <div className="form-note">
              <Sparkles size={16} /> Open tracks: {society.roles.join(", ")}
            </div>
          </div>
        </aside>

        {/* Form Container */}
        <div className="apply-form-wrapper">
          {draftNotice && (
            <div className="draft-alert">
              <span>Restored your saved progress from this device.</span>
              <button
                type="button"
                className="dismiss-draft-btn"
                onClick={() => setDraftNotice(false)}
              >
                Dismiss
              </button>
            </div>
          )}

          <form className="application-form" onSubmit={handleSubmit} noValidate>
            <div className="form-heading">
              <span>01</span>
              <div>
                <h2>Applicant Information</h2>
                <p>Tell the leads about your academic background.</p>
              </div>
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="name">
                  Full Name <span>*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="e.g. Aryan Sharma"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="field">
                <label htmlFor="year">
                  Academic Year <span>*</span>
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.year)}
                >
                  <option value="">Select current year</option>
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
                {errors.year && <p className="error-text">{errors.year}</p>}
              </div>

              <div className="field">
                <label htmlFor="branch">
                  Branch / Department <span>*</span>
                </label>
                <input
                  id="branch"
                  name="branch"
                  placeholder="e.g. Computer Science (CSAI / COE)"
                  value={formData.branch}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.branch)}
                />
                {errors.branch && <p className="error-text">{errors.branch}</p>}
              </div>

              <div className="field">
                <label htmlFor="role">
                  Role You are Applying For <span>*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.role)}
                >
                  <option value="">Select a domain track</option>
                  {society.roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="error-text">{errors.role}</p>}
              </div>

              <div className="field">
                <label htmlFor="phone">Phone / WhatsApp (Optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              <div className="field">
                <label htmlFor="portfolio">GitHub / LinkedIn / Portfolio (Optional)</label>
                <input
                  id="portfolio"
                  name="portfolio"
                  type="url"
                  placeholder="https://github.com/yourhandle"
                  value={formData.portfolio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-heading" style={{ marginTop: "2rem" }}>
              <span>02</span>
              <div>
                <h2>Statement of Interest</h2>
                <p>Why do you want to contribute to {society.name}?</p>
              </div>
            </div>

            <div className="field">
              <div className="label-row">
                <label htmlFor="why">
                  Your Pitch &amp; Relevant Experience <span>*</span>
                </label>
                <small className={formData.why.length < 20 ? "char-warning" : "char-ok"}>
                  {formData.why.length} / 20 characters min
                </small>
              </div>
              <textarea
                id="why"
                name="why"
                rows={5}
                placeholder="Mention past projects, hackathons, skills, or why you are excited to join..."
                value={formData.why}
                onChange={handleChange}
                aria-invalid={Boolean(errors.why)}
              />
              {errors.why && <p className="error-text">{errors.why}</p>}
            </div>

            <div className="form-submit-row">
              <button type="submit" className="submit-app-btn">
                <Send size={16} /> Submit Application
              </button>
              <span className="auto-save-hint">
                <Save size={13} /> Auto-saving draft
              </span>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Apply;
