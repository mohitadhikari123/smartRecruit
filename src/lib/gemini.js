import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model for text generation
const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Model for embeddings
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function summarizeResume(extractedText) {
    const result = await textModel.generateContent({
        contents: [{ role: "user", parts: [{ text: `Summarize this resume: ${extractedText}` }] }],
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
            }],
        }],
    });
    return result.response.text();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function generateEmbeddings(text) {
    try {
        await sleep(1500);
        const result = await embeddingModel.embedContent({
            content: {
                parts: [{ text: text }]
            }
        });

        return result.embedding.values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}


