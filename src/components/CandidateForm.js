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
    jobDescription: "",
    resume: null,
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("linkedIn", formData.linkedIn);
    data.append("skills", formData.skills);
    data.append("jobDescription", formData.jobDescription);
    data.append("resume", formData.resume);

    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        setShowModal(false);
        localStorage.setItem("candidateFeedback", JSON.stringify(result.feedback));
        localStorage.setItem("candidateScore", result.score);
        router.push('/feedback');
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      setShowModal(false);
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
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleOutsideClick}>
          <div className={styles.modalContent}>
            <h3>Enter Job Description</h3>
            <textarea name="jobDescription" rows="5" placeholder="Job Description" onChange={handleChange} className={styles.textarea}></textarea>
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