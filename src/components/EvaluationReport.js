"use client";
import styles from '../styles/EvaluationReport.module.css';

const EvaluationReport = ({ evaluation }) => {
  const {
    overallScore = 75,
    categoryScores = { skills: 85, experience: 60, qualifications: 70 },
    strengths = [
      "Strong technical skill alignment with job requirements",
      "Proficient in JavaScript, Java technologies",
      "Good problem-solving abilities",
      "Effective communication skills"
    ],
    missingSkills = [
      "Limited relevant experience or unclear career progression",
      "Educational qualifications may not fully meet requirements",
      "Lack of specific domain expertise",
      "Need for additional training in advanced concepts"
    ],
    hiringRecommendation = "Proceed with Caution - Significant gaps identified that may impact job performance. Consider if candidate demonstrates strong learning ability and cultural fit that could compensate for technical gaps.",
    hrRecommendations = [
      "Conduct technical assessment focusing on core technologies mentioned in job requirements",
      "Explore specific examples of past projects and problem-solving approaches during interview",
      "Assess cultural fit and communication style through behavioral interview questions",
      "Verify educational credentials and professional certifications mentioned in resume",
      "Consider additional screening rounds to thoroughly evaluate capabilities"
    ]
  } = evaluation || {};

  const getScoreColor = (score) => {
    if (score >= 80) return 'emerald';
    if (score >= 65) return 'blue';
    if (score >= 50) return 'amber';
    return 'red';
  };

  const getScoreColorClass = (score) => {
    const color = getScoreColor(score);
    return styles[`score-${color}`];
  };

  const getProgressColorClass = (score) => {
    const color = getScoreColor(score);
    return styles[`progress-${color}`];
  };

  const getRecommendationBgClass = (score) => {
    const color = getScoreColor(score);
    return styles[`recommendation-${color}`];
  };

  return (
    <div className={styles.evaluationReport}>
      {/* Section 1 - Header */}
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Evaluation Report</h1>
        </div>
      </div>

      {/* Section 2 - Overall Score */}
      <div className={styles.overallScoreSection}>
        <div className={styles.scoreHeader}>
          <h2 className={styles.scoreTitle}>Overall Compatibility Score</h2>
          <div className={`${styles.scoreBadge} ${getScoreColorClass(overallScore)}`}>
            {overallScore}/100
          </div>
        </div>
        <div className={styles.progressContainer}>
          <div className={`${styles.progressBar} ${getProgressColorClass(overallScore)}`} 
               style={{ width: `${overallScore}%` }}>
          </div>
        </div>
      </div>

      {/* Section 3 - Category Breakdown */}
      <div className={styles.categorySection}>
        <h2 className={styles.sectionTitle}>Category Breakdown</h2>
        <div className={styles.categoriesGrid}>
          {Object.entries(categoryScores).map(([category, score]) => {
            const color = getScoreColor(score);
            const colorMap = {
              emerald: '#10b981',
              blue: '#3b82f6',
              amber: '#f59e0b',
              red: '#ef4444'
            };
            
            const radius = 32;
            const strokeWidth = 8;
            const circumference = radius * 2 * Math.PI;
            const strokeDasharray = `${circumference} ${circumference}`;
            const strokeDashoffset = circumference - (score / 100) * circumference;
            
            return (
              <div key={category} className={styles.categoryItem}>
                <div className={styles.circularProgress}>
                  <svg
                    className={styles.circleSvg}
                    width={120}
                    height={120}
                    viewBox="0 0 80 80"
                  >
                    {/* Background circle */}
                    <circle
                      className={styles.circleBackground}
                      stroke="#e5e7eb"
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      r={radius}
                      cx={40}
                      cy={40}
                    />
                    {/* Progress circle */}
                    <circle
                      className={styles.circleProgress}
                      stroke={colorMap[color]}
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      style={{
                        strokeDashoffset,
                        transition: 'stroke-dashoffset 0.5s ease-in-out'
                      }}
                      r={radius}
                      cx={40}
                      cy={40}
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className={styles.circleText}>
                    <span className={styles.circleScore}>{score}</span>
                    <span className={styles.circleTotal}>/100</span>
                  </div>
                </div>
                <div className={styles.categoryLabel}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 4 - Strengths */}
      <div className={styles.strengthsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.checkIcon}>✓</div>
          <h2 className={styles.strengthsTitle}>Strengths</h2>
        </div>
        <div className={styles.strengthsContainer}>
          <ul className={styles.strengthsList}>
            {strengths.map((strength, index) => (
              <li key={index} className={styles.strengthItem}>
                <div className={styles.strengthDot}></div>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 5 - Missing Skills/Gaps */}
      <div className={styles.gapsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.alertIcon}>⚠</div>
          <h2 className={styles.gapsTitle}>Missing Skills or Gaps</h2>
        </div>
        <div className={styles.gapsContainer}>
          <ul className={styles.gapsList}>
            {missingSkills.map((gap, index) => (
              <li key={index} className={styles.gapItem}>
                <div className={styles.gapDot}></div>
                {gap}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section 6 - Hiring Recommendation */}
      <div className={styles.recommendationSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.trendingIcon}>📈</div>
          <h2 className={styles.recommendationTitle}>Hiring Recommendation</h2>
        </div>
        <div className={`${styles.recommendationContainer} ${getRecommendationBgClass(overallScore)}`}>
          <p className={styles.recommendationText}>{hiringRecommendation}</p>
        </div>
      </div>

      {/* Section 7 - HR Recommendations */}
      <div className={styles.hrSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.usersIcon}>👥</div>
          <h2 className={styles.hrTitle}>Recommendations for HR</h2>
        </div>
        <div className={styles.hrContainer}>
          <ul className={styles.hrList}>
            {hrRecommendations.map((recommendation, index) => (
              <li key={index} className={styles.hrItem}>
                <div className={styles.hrDot}></div>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvaluationReport;
