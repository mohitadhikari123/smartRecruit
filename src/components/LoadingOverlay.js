"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from '../styles/LoadingOverlay.module.css';

const LoadingOverlay = ({ isVisible, message = "Processing..." }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.lottieContainer}>
          <DotLottieReact
            src="/scan_document.lottie"
            loop
            autoplay
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <div className={styles.loadingText}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
