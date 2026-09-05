import { useState } from "react";
import { useParams } from "react-router-dom";
import societies from "../data/societies";

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

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(formData);
    }
  }

  const [errors, setErrors] = useState({});

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

  if (!society) {
    return <div>Society not found</div>;
  }

  return (
    <div>
      <h1>Apply to {society.name}</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

        <input name="year" value={formData.year} onChange={handleChange} />
        {errors.year && <p style={{ color: "red" }}>{errors.year}</p>}

        <input name="branch" value={formData.branch} onChange={handleChange} />
        {errors.branch && <p style={{ color: "red" }}>{errors.branch}</p>}

        <input name="role" value={formData.role} onChange={handleChange} />
        {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}

        <input name="why" value={formData.why} onChange={handleChange} />
        {errors.why && <p style={{ color: "red" }}>{errors.why}</p>}
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default Apply;
