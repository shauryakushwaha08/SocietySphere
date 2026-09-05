import { useState } from "react";

function Apply() {
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

  return (
    <div>
      <h1>Apply</h1>
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
