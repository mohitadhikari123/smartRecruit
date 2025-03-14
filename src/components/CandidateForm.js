"use client";
import { useState } from "react";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedIn: "",
    skills: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("linkedIn", formData.linkedIn);
    data.append("skills", formData.skills);
    data.append("resume", formData.resume);

    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        alert("Resume submitted successfully!");
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h2>Candidate Application Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="url" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required />
        <input type="file" accept=".pdf" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CandidateForm;
