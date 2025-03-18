"use client";
import { useEffect, useState } from "react";
import styles from '../../styles/FeedbackPage.module.css';
import Link from 'next/link';

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState(null);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const storedFeedback = localStorage.getItem("candidateFeedback");
        const storedScore = localStorage.getItem("candidateScore");

        if (storedFeedback) {
            try {
                const parsedFeedback = JSON.parse(storedFeedback);
                setFeedback(parsedFeedback);
            } catch (error) {
                console.error("Error parsing feedback:", error);
                setFeedback(null);
            }
            localStorage.removeItem("candidateFeedback");
        }

        if (storedScore) {
            setScore(parseFloat(storedScore));
            localStorage.removeItem("candidateScore");
        }

    }, []);

    if (feedback === null) {
        return <div className={styles.feedbackContainer}>Loading feedback...</div>;
    }

    return (
        <div className={styles.feedbackContainer}>
            <div className={styles.headerContainer}>
                <h2 className={styles.feedbackTitle}>Candidate Feedback</h2>
                <div className={styles.header}>
                    <Link href="/" className={styles.homeLink}>
                        Home
                    </Link>
                </div>
            </div>
            {score !== null && <p><strong>Similarity Score:</strong> {score.toFixed(1)}%</p>}
            <pre className={styles.feedbackPre}>{feedback}</pre>
        </div>
    );
};

export default FeedbackPage;