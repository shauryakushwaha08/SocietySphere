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
    console.log(formData);
  }

  if (!society) {
    return <div>Society not found</div>;
  }

  return (
    <div>
      <h1>Apply to {society.name}</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="year" value={formData.year} onChange={handleChange} />
        <input name="branch" value={formData.branch} onChange={handleChange} />
        <input name="role" value={formData.role} onChange={handleChange} />
        <input name="why" value={formData.why} onChange={handleChange} />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}

export default Apply;
