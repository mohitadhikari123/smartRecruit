"use client";
import { useEffect, useState } from "react";
import styles from '../../styles/FeedbackPage.module.css';

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const storedFeedback = localStorage.getItem("candidateFeedback");
        if (storedFeedback) {
            try {
                let parsedFeedback = JSON.parse(storedFeedback);

                // Check if feedback is a string and remove * and #
                if (typeof parsedFeedback === 'string') {
                    parsedFeedback = parsedFeedback.replace(/[*#]/g, '');
                }

                setFeedback(parsedFeedback);
            } catch (error) {
                console.error("Error parsing feedback:", error);
                setFeedback(null);
            }
            localStorage.removeItem("candidateFeedback");
        }
    }, []);

    if (feedback === null) {
        return <div className={styles.feedbackContainer}>Loading feedback...</div>;
    }

    return (
        <div className={styles.feedbackContainer}>
            <h2 className={styles.feedbackTitle}>Candidate Feedback</h2>
            <pre className={styles.feedbackPre}>{feedback}</pre>
        </div>
    );
};

export default FeedbackPage;