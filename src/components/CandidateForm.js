"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "../styles/CandidateForm.module.css";

const CandidateForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedIn: "",
    skills: "",
    resume: null,
  });
  const [jobDescription, setJobDescription] = useState("");
  const [showJobDescription, setShowJobDescription] = useState(false);
  const [candidateId, setCandidateId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("linkedIn", formData.linkedIn);
    data.append("skills", formData.skills);
    data.append("resume", formData.resume);

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        body: data,
      });
      
      const result = await response.json();
      if (result.success) {
        setCandidateId(result.candidateId);
        setShowJobDescription(true);
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

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateId: candidateId,
          jobDescription: jobDescription,
        }),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem("candidateFeedback", JSON.stringify(result.feedback));
        localStorage.setItem("candidateScore", result.score);
        router.push('/feedback');
      } else {
        alert("Job description processing failed: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting job description:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRanking = () => {
    router.push('/ranking');
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Candidate Application Form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className={styles.input} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className={styles.input} />
        <input type="url" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} required className={styles.input} />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" onChange={handleChange} required className={styles.input} />
        <input type="file" accept=".pdf" onChange={handleFileChange} required className={styles.fileInput} />
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {showJobDescription && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Enter Job Description</h3>
            <textarea name="jobDescription" rows="5" placeholder="Job Description" onChange={handleJobDescriptionChange} className={styles.textarea}></textarea>
            <button onClick={handleFinalSubmit} className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
      <button onClick={navigateToRanking} className={`${styles.submitButton} ${styles.rankingButton}`}>Ranking Page</button>
    </div>
  );
};

export default CandidateForm;