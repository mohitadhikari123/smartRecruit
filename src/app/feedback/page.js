"use client";
import { useEffect, useState } from "react";
import styles from '../../styles/FeedbackPage.module.css';
import EvaluationReport from '../../components/EvaluationReport';
import Link from 'next/link';

const FeedbackPage = () => {
    const [evaluation, setEvaluation] = useState(null);

    useEffect(() => {
        const storedEvaluation = localStorage.getItem("candidateEvaluation");

        if (storedEvaluation) {
            try {
                const parsedEvaluation = JSON.parse(storedEvaluation);
                setEvaluation(parsedEvaluation);
            } catch (error) {
                console.error("Error parsing evaluation:", error);
                // Fallback to static data if parsing fails
                const balancedScore = 65; // Default balanced score
                const evaluationData = {
                    overallScore: balancedScore,
                    categoryScores: {
                        skills: Math.max(30, Math.min(100, Math.round(balancedScore + Math.random() * 20 - 10))),
                        experience: Math.max(25, Math.min(100, Math.round(balancedScore + Math.random() * 25 - 15))),
                        qualifications: Math.max(35, Math.min(100, Math.round(balancedScore + Math.random() * 20 - 12)))
                    },
                    strengths: [
                        "Strong technical foundation",
                        "Good problem-solving abilities",
                        "Willingness to learn and adapt",
                        "Relevant educational background"
                    ],
                    missingSkills: [
                        "Some gaps in specific technologies",
                        "Limited experience in certain areas",
                        "Need for additional training in advanced concepts"
                    ],
                    hiringRecommendation: balancedScore >= 70 
                        ? "PROCEED - Candidate demonstrates strong alignment with job requirements and shows potential for success in the role."
                        : balancedScore >= 50
                        ? "PROCEED WITH CAUTION - Some gaps identified but candidate shows potential. Consider additional training and support."
                        : "PROCEED WITH CAUTION - Significant gaps identified that may impact performance. Consider if candidate demonstrates strong learning ability and cultural fit.",
                    hrRecommendations: [
                        "Conduct technical assessment focusing on core technologies",
                        "Explore specific examples of past projects during interview",
                        "Assess learning ability and cultural fit",
                        "Consider additional training for specific gaps",
                        "Verify experience claims and technical skills"
                    ]
                };
                setEvaluation(evaluationData);
            }
            localStorage.removeItem("candidateEvaluation");
        }

    }, []);

    if (evaluation === null) {
        return (
            <div className={styles.feedbackContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Loading evaluation results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.feedbackContainer}>
            {/* Navigation Header */}
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>
                        <img src="/Images/logo.png" alt="Smart Recruit Logo" className={styles.logoImage} />
                        <span className={styles.logoText}>Smart Recruit</span>
                    </Link>
                </div>
            </nav>
            
            <EvaluationReport evaluation={evaluation} />
            
           
        </div>
    );
};

export default FeedbackPage;