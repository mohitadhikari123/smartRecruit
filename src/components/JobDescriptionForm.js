"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "../styles/JobDescriptionForm.module.css";
import { getSampleJobTitles, getSampleJobDescription } from "../utils/sampleJobDescriptions";
import LoadingOverlay from "./LoadingOverlay";

const JobDescriptionForm = ({ candidateId, onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [showSamples, setShowSamples] = useState(false);
  
  const sampleTitles = getSampleJobTitles();

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSampleSelect = (title) => {
    const sampleDescription = getSampleJobDescription(title);
    setJobDescription(sampleDescription);
    setShowSamples(false);
  };

  const toggleSamples = () => {
    setShowSamples(!showSamples);
  };

  const handleSubmit = async (e) => {
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
        localStorage.setItem("candidateEvaluation", JSON.stringify(result.evaluation));
        onClose();
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

  return (
    <div className={styles.modalFormContainer}>
      <LoadingOverlay isVisible={isLoading} message="Getting AI Analysis..." />
      
      <h2 className={styles.title}>Enter Job Description</h2>
      
      <div className={styles.jobInputContainer}>
        <div className={styles.jobInputHeader}>
          <span className={styles.inputLabel}>PASTE A JOB DESCRIPTION BELOW</span>
          <span className={styles.orDivider}>OR</span>
          <button 
            type="button"
            onClick={toggleSamples}
            className={styles.sampleToggleButton}
          >
            {showSamples ? "HIDE SAMPLE JOB DESCRIPTIONS" : "USE A SAMPLE JOB DESCRIPTION"}
          </button>
        </div>
        
        <div className={styles.inputArea}>
          <textarea 
            name="jobDescription" 
            rows="8" 
            placeholder="Paste your job description here..." 
            value={jobDescription}
            onChange={handleJobDescriptionChange} 
            className={styles.textarea}
            required
          ></textarea>
          
          {showSamples && (
            <div className={styles.samplesContainer}>
              <div className={styles.samplesHeader}>Select a sample job description:</div>
              <div className={styles.samplesList}>
                {sampleTitles.map((title) => (
                  <button
                    key={title}
                    onClick={() => handleSampleSelect(title)}
                    className={styles.sampleButton}
                    type="button"
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <button onClick={handleSubmit} className={styles.submitButton} disabled={isLoading || !jobDescription.trim()}>
        {isLoading ? "Analyzing..." : "Get AI Analysis"}
      </button>
    </div>
  );
};

export default JobDescriptionForm;
