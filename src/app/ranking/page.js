"use client"
import { useState } from 'react';
import styles from '../../styles/ranking.module.css';
import Link from 'next/link';
import { getSampleJobTitles, getSampleJobDescription } from '../../utils/sampleJobDescriptions';
import LoadingOverlay from '../../components/LoadingOverlay';

async function fetchRankedCandidates(jobDescription) {
    try {
        const response = await fetch('/api/ranking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jobDescription }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.rankedCandidates;
    } catch (error) {
        console.error('Error fetching ranked candidates:', error);
        return [];
    }
}

export default function RankingPage() {
    const [jobDescription, setJobDescription] = useState('');
    const [rankedCandidates, setRankedCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [showSamples, setShowSamples] = useState(false);
    
    const sampleTitles = getSampleJobTitles();

    const handleSearch = async () => {
        setLoading(true);
        setSearchPerformed(true);
        const candidates = await fetchRankedCandidates(jobDescription);
        setRankedCandidates(candidates);
        setLoading(false);
    };

    const handleSampleSelect = (title) => {
        const sampleDescription = getSampleJobDescription(title);
        setJobDescription(sampleDescription);
        setShowSamples(false);
    };

    const toggleSamples = () => {
        setShowSamples(!showSamples);
    };


    // Helper function to normalize similarity score to percentage (0-100)
    const normalizeScore = (score) => {
        if (score > 1) {
            // If score is already a percentage (e.g., 81.7), cap it at 100
            return Math.min(score, 100);
        } else {
            // If score is decimal (e.g., 0.817), convert to percentage
            return Math.min(score * 100, 100);
        }
    };

    return (
        <div className={styles.rankingPage}>
            {/* Navigation Header */}
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <Link href="/" className={styles.logo}>
                        <img src="/Images/logo.png" alt="Smart Recruit Logo" className={styles.logoImage} />
                        <span className={styles.logoText}>Smart Recruit</span>
                    </Link>
                    <div className={styles.navButtons}>
                        <Link href="/" className={styles.rankingBtn}>
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContainer}>
                    <h1 className={styles.heroTitle}>
                        Find the Best <span className={styles.gradientText}>Candidates</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Get AI-powered candidate rankings based on job requirements. 
                        Find the most suitable candidates in seconds.
                    </p>
                </div>
            </section>

            {/* Search Section */}
            {(!rankedCandidates.length > 0 || !searchPerformed) && (
                <section className={styles.searchSection}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchCard}>
                            <LoadingOverlay isVisible={loading} message="Searching Candidates..." />
                            
                            <h2 className={styles.searchTitle}>Search Candidates</h2>
                            
                            <div className={styles.jobInputContainer}>
                                <div className={styles.jobInputHeader}>
                                    <span className={styles.inputLabel}>PASTE A JOB DESCRIPTION BELOW</span>
                                    <span className={styles.orDivider}>OR</span>
                                    <button 
                                        type="button"
                                        onClick={toggleSamples}
                                        className={styles.sampleToggleButton}
                                    >
                                        USE A SAMPLE JOB DESCRIPTION
                                    </button>
                                </div>
                                
                                <div className={styles.inputArea}>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        placeholder="Enter the job description to find matching candidates..."
                                        rows={8}
                                        className={styles.textarea}
                                    />
                                    
                                    {showSamples && (
                                        <div className={styles.samplesContainer}>
                                            <div className={styles.samplesHeader}>Select a sample job description:</div>
                                            <div className={styles.samplesList}>
                                                {sampleTitles.map((title) => (
                                                    <button
                                                        key={title}
                                                        onClick={() => handleSampleSelect(title)}
                                                        className={styles.sampleButton}
                                                    >
                                                        {title}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <button onClick={handleSearch} disabled={loading || !jobDescription.trim()} className={styles.searchButton}>
                                {loading ? 'Searching...' : 'Search Candidates'}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Results Section */}
            {searchPerformed && rankedCandidates.length > 0 && (
                <section className={styles.resultsSection}>
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsHeader}>
                            <h2 className={styles.resultsTitle}>Ranked Candidates</h2>
                            <div className={styles.resultsCount}>
                                {rankedCandidates.length} candidates found
                            </div>
                        </div>
                        
                        <div className={styles.tableContainer}>
                            <table className={styles.candidatesTable}>
                                <thead>
                                    <tr>
                                        <th className={styles.rankCol} style={{textAlign: 'center'}}>#</th>
                                        <th className={styles.candidateCol}>Candidate</th>
                                        <th className={styles.emailCol}>Email</th>
                                        <th className={styles.scoreCol}>Match Score</th>
                                        <th className={styles.statusCol}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rankedCandidates.map((candidate, index) => (
                                        <tr key={candidate._id} className={styles.candidateRow}>
                                            <td className={styles.rankCell} data-label="Rank">
                                                <div className={styles.rankNumber}>{index + 1}</div>
                                            </td>
                                            <td className={styles.candidateCell} data-label="Candidate">
                                                <div className={styles.candidateName}>{candidate.name}</div>
                                            </td>
                                            <td className={styles.emailCell} data-label="Email">{candidate.email}</td>
                                            <td className={styles.scoreCell} data-label="Score">
                                                <div className={styles.scoreContainer}>
                                                    <div className={styles.scoreBar}>
                                                        <div 
                                                            className={styles.scoreFill}
                                                            style={{ width: `${normalizeScore(candidate.similarityScore)}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className={styles.scoreText}>
                                                        {normalizeScore(candidate.similarityScore).toFixed(1)}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className={styles.statusCell} data-label="Status">
                                                <span className={`${styles.statusBadge} ${
                                                    normalizeScore(candidate.similarityScore) > 70 ? styles.statusAvailable : 
                                                    normalizeScore(candidate.similarityScore) > 40 ? styles.statusPending : 
                                                    normalizeScore(candidate.similarityScore) > 0 ? styles.statusLow : styles.statusNoMatch
                                                }`}>
                                                    {normalizeScore(candidate.similarityScore) > 70 ? 'Excellent Match' : 
                                                     normalizeScore(candidate.similarityScore) > 40 ? 'Good Match' : 
                                                     normalizeScore(candidate.similarityScore) > 0 ? 'Bad Match' : 'No Match'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* No Results */}
            {searchPerformed && rankedCandidates.length === 0 && !loading && (
                <section className={styles.noResultsSection}>
                    <div className={styles.noResultsContainer}>
                        <div className={styles.noResultsIcon}>🔍</div>
                        <h3 className={styles.noResultsTitle}>No matching candidates found</h3>
                        <p className={styles.noResultsText}>
                            Try adjusting your job description or search criteria to find more candidates.
                        </p>
                        <button 
                            onClick={() => setSearchPerformed(false)} 
                            className={styles.tryAgainButton}
                        >
                            Try Again
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}
