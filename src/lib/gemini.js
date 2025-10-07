import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model for text generation
const textModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

// Model for embeddings
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function summarizeResume(resumeText) {
    const result = await textModel.generateContent({
        contents: [{ role: "user", parts: [{ text: `Summarize this resume: ${resumeText}` }] }],
    });
    return result.response.text();
}

export async function generateCandidateFeedback(candidateProfile, jobDescription) {
    const result = await textModel.generateContent({
        contents: [{
            role: "user",
            parts: [{
                text: `Evaluate the following candidate profile against the given job description and provide structured feedback for HR. Be BALANCED in your scoring - harsh only when there's a clear profile mismatch, but lenient for reasonably qualified candidates.\n\n
                **Candidate Profile:**\n${candidateProfile}\n\n
                **Job Description:**\n${jobDescription}\n\n
                **EVALUATION RULES - MEASURE ACTUAL RESUME CONTENT:**
                
                **SKILLS SCORING (0-100):**
                - 90-100: Has ALL required technologies mentioned in job description
                - 80-89: Has 80%+ of required technologies
                - 70-79: Has 60-80% of required technologies
                - 60-69: Has 40-60% of required technologies
                - 50-59: Has 20-40% of required technologies
                - 40-49: Has 10-20% of required technologies
                - 30-39: Has very few required technologies
                - 20-29: Has minimal relevant technologies
                - 10-19: Has almost no relevant technologies
                - 0-9: Has no relevant technologies
                
                **EXPERIENCE SCORING (0-100):**
                - 90-100: Has MORE than required years of experience in exact role
                - 80-89: Has exact required years of experience in similar role
                - 70-79: Has 80%+ of required years in similar role
                - 60-69: Has 60-80% of required years in similar role
                - 50-59: Has 40-60% of required years in similar role
                - 40-49: Has 20-40% of required years in similar role
                - 30-39: Has very limited relevant experience
                - 20-29: Has minimal relevant experience
                - 10-19: Has almost no relevant experience
                - 0-9: Has no relevant experience
                
                **QUALIFICATIONS SCORING (0-100):**
                - 90-100: Has EXACT required degree + certifications + additional qualifications
                - 80-89: Has required degree + some certifications
                - 70-79: Has required degree + basic qualifications
                - 60-69: Has similar degree + some relevant qualifications
                - 50-59: Has related degree + basic qualifications
                - 40-49: Has somewhat related degree + minimal qualifications
                - 30-39: Has unrelated degree + some relevant qualifications
                - 20-29: Has unrelated degree + minimal qualifications
                - 10-19: Has no degree + some relevant qualifications
                - 0-9: Has no degree + no relevant qualifications
                
                **CRITICAL**: Score based on what's ACTUALLY in the resume, not assumptions!\n\n
                **MANDATORY ANALYSIS INSTRUCTIONS:**
                1. **For SKILLS**: Count how many technologies from job description appear in the resume
                2. **For EXPERIENCE**: Look for actual work experience, internships, projects - count years and relevance
                3. **For QUALIFICATIONS**: Look for degrees, certifications, courses mentioned in resume
                4. **If something is missing from resume, score it LOW (0-30)**
                5. **If something is present but limited, score it MODERATE (40-60)**
                6. **If something is well-documented, score it HIGH (70-90)**
                7. **If something exceeds requirements, score it EXCELLENT (90-100)**\n\n
                **EXPLICIT SCORING RULES - FOLLOW THESE EXACTLY:**
                - **NO DEGREE mentioned in resume** = Qualifications score MUST be 10-25
                - **NO WORK EXPERIENCE mentioned in resume** = Experience score MUST be 5-20
                - **NO INTERNSHIP mentioned in resume** = Experience score MUST be 5-20
                - **NO PROJECTS mentioned in resume** = Experience score MUST be 5-20
                - **NO TECHNICAL SKILLS matching job requirements** = Skills score MUST be 10-30
                - **ONLY PROJECTS mentioned (no work experience)** = Experience score MUST be 40-50
                - **ONLY SELF-TAUGHT skills mentioned** = Qualifications score MUST be 15-35\n\n
                **CRITICAL INSTRUCTIONS:**
                1. **DO NOT USE DEFAULT SCORES!** Analyze the actual resume content
                2. **DO NOT COPY EXAMPLE VALUES!** Generate unique scores based on the resume
                3. **CALCULATE EACH SCORE INDIVIDUALLY** based on what's actually in the resume
                4. **IF SOMETHING IS MISSING, SCORE IT LOW (0-30)**
                5. **IF SOMETHING IS PRESENT, SCORE IT APPROPRIATELY (40-90)**
                
                **FOR THE RESUME PROVIDED ABOVE:**
                - Check if degree/education is mentioned
                - Check if work experience/internships are mentioned  
                - Check if certifications are mentioned
                - Count actual technologies that match job requirements
                - Score based on what's ACTUALLY present, not what you assume
                - Generate UNIQUE scores, not example values
                **Please provide your evaluation in the following EXACT JSON format:**\n
                {\n
                  "overallScore": [CALCULATE BASED ON ACTUAL RESUME CONTENT],\n
                  "categoryScores": {\n
                    "skills": [CALCULATE BASED ON TECHNOLOGIES IN RESUME],\n
                    "experience": [CALCULATE BASED ON WORK EXPERIENCE IN RESUME],\n
                    "qualifications": [CALCULATE BASED ON EDUCATION IN RESUME]\n
                  },\n
                  "strengths": [\n
                    "[LIST ACTUAL STRENGTHS FROM RESUME]",\n
                    "[LIST ACTUAL STRENGTHS FROM RESUME]",\n
                    "[LIST ACTUAL STRENGTHS FROM RESUME]"\n
                  ],\n
                  "missingSkills": [\n
                    "[LIST ACTUAL GAPS BASED ON JOB REQUIREMENTS]",\n
                    "[LIST ACTUAL GAPS BASED ON JOB REQUIREMENTS]",\n
                    "[LIST ACTUAL GAPS BASED ON JOB REQUIREMENTS]"\n
                  ],\n
                  "hiringRecommendation": "[WRITE SPECIFIC RECOMMENDATION BASED ON ACTUAL ANALYSIS]",\n
                  "hrRecommendations": [\n
                    "[WRITE SPECIFIC RECOMMENDATION 1]",\n
                    "[WRITE SPECIFIC RECOMMENDATION 2]",\n
                    "[WRITE SPECIFIC RECOMMENDATION 3]",\n
                    "[WRITE SPECIFIC RECOMMENDATION 4]",\n
                    "[WRITE SPECIFIC RECOMMENDATION 5]"\n
                  ]\n
                }\n\n
                **EXAMPLE SCORING SCENARIOS:**
                - Resume with NO degree mentioned + NO internship + NO work experience = Qualifications: 10-20, Experience: 5-15
                - Resume with Computer Science degree + 2 years experience + 80% required skills = Qualifications: 70-80, Experience: 70-80, Skills: 70-80
                - Resume with unrelated degree + 1 year experience + 30% required skills = Qualifications: 30-40, Experience: 40-50, Skills: 30-40
                - Resume with ONLY projects (no degree, no work experience) = Qualifications: 10-25, Experience: 20-40
                - Resume with ONLY self-taught skills (no formal education) = Qualifications: 15-35, Experience: 5-20
                - Resume with NO formal education + NO work experience + ONLY projects = Qualifications: 10-25, Experience: 20-40, Skills: Based on technology match\n\n
                **BALANCED Scoring Guidelines:**\n
                - 90-100: Exceptional candidate, exceeds all requirements\n
                - 80-89: Strong candidate, minor gaps but highly qualified\n
                - 70-79: Good candidate, some concerns but acceptable\n
                - 60-69: Average candidate, some gaps but reasonable fit\n
                - 50-59: Below average, significant gaps but potential\n
                - 40-49: Poor fit, major concerns, proceed with caution\n
                - 30-39: Very poor fit, skill mismatch, REJECT\n
                - 20-29: Wrong field entirely, REJECT\n
                - 0-19: Completely unsuitable, REJECT\n\n
                **Hiring Recommendation Guidelines:**\n
                - Score 70+: "PROCEED - Strong candidate with good alignment"\n
                - Score 50-69: "PROCEED WITH CAUTION - Some gaps but potential, consider training"\n
                - Score 40-49: "PROCEED WITH CAUTION - Significant gaps, needs extensive training"\n
                - Score 30-39: "REJECT - Major skill mismatch, not suitable"\n
                - Score 0-29: "REJECT - Completely unsuitable, wrong field"\n\n
                **FINAL REMINDER:** 
                - Generate UNIQUE scores based on the actual resume content
                - Do NOT use example values like 65, 70, 60
                - Calculate each score individually based on what's actually in the resume
                - If no degree mentioned, qualifications should be 10-25
                - If no work experience mentioned, experience should be 5-20
                - If few matching skills, skills should be 10-40
                
                **Important:** Return ONLY the JSON object, no additional text or explanations.`
            }]
        }]
    });

    const responseText = result.response.text();
    return responseText.replace(/[*#]/g, '');
}
export async function getGeminiSimilarityScore(candidates, jobDescription) {
    let prompt;
    let singleCandidate = false;

    if (typeof candidates === 'string') {
        singleCandidate = true;
        prompt = `You are an experienced HR professional tasked with evaluating a candidate profile against a job description. 
        Provide a similarity score from 0 to 100 with decimal points (e.g., 93.7, 62.1, 78.9, 32.5). 
        The similarity score should represent the overall fit for the role.
        Consider how well the candidate's skills, experience, and background match the requirements listed in the job description.
        Do not provide round numbers.
        Example output: 93.7
        Do not include any additional text, only the score.

        **Candidate Profile:**\n${candidates}\n\n
        **Job Description:**\n${jobDescription}\n\n
        **Similarity Score (0-100, with decimal points):**`;
    } else if (Array.isArray(candidates) && candidates.length > 0 && typeof candidates[0] === 'object' && candidates[0].resumeText) {
        // Multiple candidates (array of candidate objects)
        const candidateProfiles = candidates.map(candidate => `**Candidate Profile:**\n${candidate.resumeText}`).join('\n\n');
        prompt = `You are an experienced HR professional tasked with evaluating candidate profiles against a job description. 
        Provide a similarity score from 0 to 100 with decimal points (e.g., 93.7, 62.1, 78.9, 32.5) for each candidate. 
        The similarity score should represent the overall fit for the role.
        Consider how well the candidate meets each of the "Key Responsibilities" and "Required Skills" that are listed in the job description.
        Consider skills, experience, and the relevance of their background.
        Return the scores in the same order as the candidates, separated by commas. 
        Do not provide round numbers.
        Example output: 93.7, 62.1, 78.9, 32.5
        Do not include any additional text, only the comma separated numbers.

        ${candidateProfiles}\n\n
        **Job Description:**\n${jobDescription}\n\n
        **Similarity Scores (0-100, comma-separated with decimal points):**`;
    } else {
        console.error("Invalid candidates input.");
        return singleCandidate ? 0 : []; 
    }

    const result = await textModel.generateContent({
        contents: [{
            role: "user",
            parts: [{
                text: prompt,
            }]
        }]
    });

    const responseText = result.response.text();
    if (singleCandidate) {
        const scoreMatch = responseText.match(/(\d+\.\d+)/); 
        if (scoreMatch) {
            return parseFloat(scoreMatch[1]);
        } else {
            console.error("Could not extract similarity score from Gemini response:", responseText);
            return 0;
        }
    } else {
        const scores = responseText.split(',').map(score => {
            const scoreMatch = score.match(/(\d+\.\d+)/);
            if (scoreMatch) {
                return parseFloat(scoreMatch[1]);
            } else {
                console.error("Could not extract similarity score from Gemini response:", score);
                return 0;
            }
        });
        return scores;
    }
}
