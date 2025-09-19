"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "../styles/CandidateForm.module.css";
import { getSampleJobTitles, getSampleJobDescription } from "../utils/sampleJobDescriptions";
import LoadingOverlay from "./LoadingOverlay";

const CandidateForm = ({ onClose, onCandidateSubmitted }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    resumeText: "",
  });
  const [candidateId, setCandidateId] = useState(null);
  const [inputMethod, setInputMethod] = useState("upload"); // "upload" or "manual"
  
  const sampleTitles = getSampleJobTitles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    // Clear the other input when switching methods
    if (method === "upload") {
      setFormData({ ...formData, resumeText: "" });
    } else {
      setFormData({ ...formData, resume: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    
    if (inputMethod === "upload") {
      data.append("resume", formData.resume);
    } else {
      data.append("resumeText", formData.resumeText);
    }

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        body: data,
      });
      
      const result = await response.json();
      if (result.success) {
        setCandidateId(result.candidateId);
        // Close current modal and open job description modal
        onClose();
        onCandidateSubmitted(result.candidateId);
      } else {
        alert("Candidate profile creation failed: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting candidate profile:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.modalFormContainer}>
      <LoadingOverlay isVisible={isLoading} message="Evaluating Candidate..." />
      
      <h2 className={styles.title}>Evaluate Candidate</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Candidate Name" onChange={handleChange} required className={styles.input} />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className={styles.input} />
        
        {/* Resume Input Method Toggle */}
        <div className={styles.toggleContainer}>
          <label className={styles.toggleLabel}>Resume Input Method:</label>
          <div className={styles.toggleButtonGroup}>
            <button
              type="button"
              onClick={() => handleInputMethodChange("upload")}
              className={`${styles.toggleButton} ${inputMethod === "upload" ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
            >
              Upload PDF File
            </button>
            <button
              type="button"
              onClick={() => handleInputMethodChange("manual")}
              className={`${styles.toggleButton} ${inputMethod === "manual" ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
            >
              Paste Resume Text
            </button>
          </div>

        {/* Conditional Resume Input */}
        {inputMethod === "upload" ? (
          <input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
            required 
            className={styles.fileInput} 
          />
        ) : (
          <textarea
            name="resumeText"
            placeholder="Paste the candidate's resume text here..."
            value={formData.resumeText}
            onChange={handleChange}
            required
            rows={6}
            className={styles.resumeTextarea}
          />
        )}
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Processing..." : "Evaluate Candidate"}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;