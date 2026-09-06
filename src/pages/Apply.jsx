import { useState } from "react";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import societies from "../data/societies";
import { saveApplication } from "../utils/storage";
import "./Apply.css";

function Apply() {
  const { id } = useParams();
  const society = societies.find((s) => s.id === id);

  const [formData, setFormData] = useState({
    name: "",
    year: "",
    branch: "",
    role: "",
    why: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.branch.trim()) {
      newErrors.branch = "Branch is required";
    }
    if (!formData.year.trim()) {
      newErrors.year = "Year is required";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.why.trim() || formData.why.trim().length < 20) {
      newErrors.why = "Please write at least 20 characters";
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
      setSubmitted(true);
    }
  }

  if (!society) {
    return (
      <div className="page-container empty-page">
        <h1>Society not found</h1>
        <Link to="/societies">Back to societies</Link>
      </div>
    );
  }
  if (!society.recruitmentOpen) {
    return (
      <div className="page-container">
        <h1>Recruitment Closed</h1>
        <p>{society.name} isn't accepting applications right now.</p>
      </div>
    );
  }
  if (submitted) {
    return (
      <main className="page-container success-page">
        <div className="success-icon">
          <CheckCircle2 size={34} />
        </div>
        <div className="section-kicker">APPLICATION RECEIVED</div>
        <h1>You’re on the list.</h1>
        <p>
          Thanks for applying to <strong>{society.name}</strong>. Your response
          is saved and the society team will be in touch.
        </p>
        <Link to="/applications" className="secondary-btn">
          View my applications
        </Link>
      </main>
    );
  }
  return (
    <main className="page-container apply-page">
      <Link to={`/society/${id}`} className="back-link">
        <ArrowLeft size={16} /> Back to {society.name}
      </Link>
      <div className="apply-layout">
        <aside className="apply-intro">
          <div className="logo-chip large">
            <img src={society.logo} alt={`${society.name} logo`} />
          </div>
          <div className="section-kicker">JOIN THE COMMUNITY</div>
          <h1>Apply to {society.name}</h1>
          <p>
            Share a little about yourself and what you would like to contribute.
            Keep it honest, specific, and you.
          </p>
          <div className="form-note">
            <CheckCircle2 size={17} /> Takes about 2 minutes
          </div>
          <div className="form-note">
            <CheckCircle2 size={17} /> Your response stays on this device
          </div>
        </aside>
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>01</span>
            <div>
              <h2>Your details</h2>
              <p>Help the team know who they’re meeting.</p>
            </div>
          </div>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="name">
                Full name <span>*</span>
              </label>
              <input
                id="name"
                name="name"
                placeholder="e.g. Aanya Sharma"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="year">
                Year <span>*</span>
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                aria-invalid={Boolean(errors.year)}
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
              {errors.year && <p className="error-text">{errors.year}</p>}
            </div>

            <div className="field">
              <label htmlFor="branch">
                Branch <span>*</span>
              </label>
              <input
                id="branch"
                name="branch"
                placeholder="e.g. Computer Science"
                value={formData.branch}
                onChange={handleChange}
                aria-invalid={Boolean(errors.branch)}
              />
              {errors.branch && <p className="error-text">{errors.branch}</p>}
            </div>

            <div className="field">
              <label htmlFor="role">
                Role you want <span>*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                aria-invalid={Boolean(errors.role)}
              >
                <option value="">Select a role</option>
                {society.roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && <p className="error-text">{errors.role}</p>}
            </div>
          </div>

          <div className="field">
            <div className="label-row">
              <label htmlFor="why">
                Why do you want to join? <span>*</span>
              </label>
              <small>{formData.why.length}/20 min</small>
            </div>
            <textarea
              id="why"
              name="why"
              placeholder="What interests you about this society?"
              value={formData.why}
              onChange={handleChange}
              aria-invalid={Boolean(errors.why)}
            />
            {errors.why && <p className="error-text">{errors.why}</p>}
          </div>

          <button type="submit">
            <Send size={17} /> Submit application
          </button>
        </form>
      </div>
    </main>
  );
}

export default Apply;
