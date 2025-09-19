"use client";
import { useState } from "react";
import Link from "next/link";
import CandidateForm from "./CandidateForm";
import JobDescriptionForm from "./JobDescriptionForm";
import styles from "../styles/Homepage.module.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Homepage = () => {
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
  const [isJobDescriptionModalOpen, setIsJobDescriptionModalOpen] = useState(false);
  const [candidateId, setCandidateId] = useState(null);

  const openCandidateModal = () => {
    setIsCandidateModalOpen(true);
  };

  const closeCandidateModal = () => {
    setIsCandidateModalOpen(false);
  };

  const openJobDescriptionModal = (id) => {
    setCandidateId(id);
    setIsJobDescriptionModalOpen(true);
  };

  const closeJobDescriptionModal = () => {
    setIsJobDescriptionModalOpen(false);
    setCandidateId(null);
  };

  return (
    <div className={styles.homepage}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <img src="/Images/logo.png" alt="Smart Recruit Logo" className={styles.logoImage} />
            <span className={styles.logoText}>Smart Recruit</span>
          </div>
          <div className={styles.navButtons}>
            <Link href="/ranking" className={styles.rankingBtn}>
              Ranking
            </Link>
            <button className={styles.getStartedBtn} onClick={openCandidateModal}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>
            Transform Your Hiring Process with
            <span className={styles.gradientText}> AI-Powered Evaluation</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Make smarter hiring decisions 10x faster with our advanced AI candidate evaluation system.
            Get detailed insights, rankings, and recommendations in minutes, not hours.
          </p>
          <button className={styles.ctaButton} onClick={openCandidateModal}>
            Start Evaluating Candidates
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.featuresTitle}>Why Choose Smart Recruit?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.lottieContainer}>
                <DotLottieReact
                  src="/Lightning.lottie"
                  loop
                  autoplay
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast</h3>
              <p className={styles.featureDescription}>
                Evaluate candidates in minutes instead of hours. Our AI processes resumes and provides insights instantly.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.lottieContainer}>
                <DotLottieReact
                  src="/Target.lottie"
                  loop
                  autoplay
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <h3 className={styles.featureTitle}>95% Accuracy</h3>
              <p className={styles.featureDescription}>
                Advanced machine learning algorithms ensure highly accurate candidate assessments and rankings.
              </p>
            </div>
            <div className={styles.featureCard}>
            <div className={styles.lottieContainer}>
                <DotLottieReact
                  src="/Isometric_data_analysis.lottie"
                  loop
                  autoplay
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <h3 className={styles.featureTitle}>Detailed Analytics</h3>
              <p className={styles.featureDescription}>
                Get comprehensive feedback, skill analysis, and detailed scoring for every candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.howItWorksContainer}>
          <h2 className={styles.howItWorksTitle}>How It Works</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Upload Resume</h3>
              <p className={styles.stepDescription}>
                Upload candidate resumes or paste resume text directly into our system.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Add Job Description</h3>
              <p className={styles.stepDescription}>
                Provide the job description to match candidates against specific requirements.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Get AI Analysis</h3>
              <p className={styles.stepDescription}>
                Receive detailed evaluation, scoring, and recommendations for each candidate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={styles.statistics}>
        <div className={styles.statisticsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>95%</div>
            <div className={styles.statLabel}>Accuracy Rate</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>10x</div>
            <div className={styles.statLabel}>Faster Processing</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>50%</div>
            <div className={styles.statLabel}>Better Hires</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <img src="/Images/logo.png" alt="Smart Recruit Logo" className={styles.logoImage} />
              <span className={styles.logoText}>Smart Recruit</span>
            </div>
            <p className={styles.footerText}>
              Revolutionizing recruitment with artificial intelligence
            </p>
          </div>
        </div>
      </footer>

      {/* Candidate Modal */}
      {isCandidateModalOpen && (
        <div className={styles.modalOverlay} onClick={closeCandidateModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeCandidateModal}>
              ×
            </button>
            <CandidateForm
              onClose={closeCandidateModal}
              onCandidateSubmitted={openJobDescriptionModal}
            />
          </div>
        </div>
      )}

      {/* Job Description Modal */}
      {isJobDescriptionModalOpen && (
        <div className={styles.modalOverlay} onClick={closeJobDescriptionModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeJobDescriptionModal}>
              ×
            </button>
            <JobDescriptionForm
              candidateId={candidateId}
              onClose={closeJobDescriptionModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
