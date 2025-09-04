import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model for text generation
const textModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
                text: `Evaluate the following candidate profile against the given job description and provide structured feedback for HR:\n\n
                **Candidate Profile:**\n${candidateProfile}\n\n
                **Job Description:**\n${jobDescription}\n\n
                **Evaluation Criteria:**\n
                1. **Skill Match (%):** How well does the candidate's skills align with the job requirements?\n
                2. **Experience Relevance:** Does their past experience match the role?\n
                3. **Missing Skills or Gaps:** Identify areas where the candidate falls short.\n
                4. **Strengths:** Highlight key strengths that make the candidate a good fit.\n
                5. **Hiring Recommendation:** Should the candidate be shortlisted? (Yes/No with reasons)`
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
