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
            parts: [{ text: `Compare the following candidate profile with the job description and provide improvement suggestions:\n\nCandidate Profile:\n${candidateProfile}\n\nJob Description:\n${jobDescription}` }],
        }],
    });
    return result.response.text();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function generateEmbeddings(text) {
    try {
        await sleep(1000);
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


