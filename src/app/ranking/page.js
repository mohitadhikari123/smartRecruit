"use client"
import { useState } from 'react';
import styles from '../../styles/ranking.module.css';

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

    const handleSearch = async () => {
        setLoading(true);
        setSearchPerformed(true);
        const candidates = await fetchRankedCandidates(jobDescription);
        setRankedCandidates(candidates);
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            {(!rankedCandidates.length > 0 || !searchPerformed) && (
                <div>
                    <h1 className={styles.title}>Candidate Ranking</h1>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Enter Job Description"
                        rows={8}
                        cols={50}
                        className={styles.textarea}
                    />
                    <button onClick={handleSearch} disabled={loading} className={styles.submitButton}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            )}

            {searchPerformed && rankedCandidates.length > 0 && (
                <div>
                    <h2 className={styles.title}>Ranked Candidates:</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>LinkedIn</th>
                                <th>Similarity Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankedCandidates.map((candidate) => (
                                <tr key={candidate._id}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.linkedIn}</td>
                                    <td>{candidate.similarityScore.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {searchPerformed && rankedCandidates.length === 0 && !loading && (
                <p>No matching candidates found.</p>
            )}
        </div>
    );
}