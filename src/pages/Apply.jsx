import { useState } from "react";
import { useParams } from "react-router-dom";
import societies from "../data/societies";
import { saveApplication } from "../utils/storage";

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
    return <div>Society not found</div>;
  }
  if (submitted) {
    return (
      <div>
        <h1>Application Submitted!</h1>
        <p>Thanks for applying to {society.name}. We'll be in touch.</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Apply to {society.name}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <input
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          {errors.year && <p style={{ color: "red" }}>{errors.year}</p>}
        </div>

        <div>
          <input
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
          />
          {errors.branch && <p style={{ color: "red" }}>{errors.branch}</p>}
        </div>

        <div>
          <input
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
          />
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
        </div>

        <div>
          <textarea
            name="why"
            placeholder="Why do you want to join? (Min 20 characters)"
            value={formData.why}
            onChange={handleChange}
          />
          {errors.why && <p style={{ color: "red" }}>{errors.why}</p>}
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default Apply;
