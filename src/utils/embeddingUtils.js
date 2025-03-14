import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use the correct model for embeddings
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function generateEmbeddings(text) {
    try {
        const result = await embeddingModel.embedContent({
            content: { text }, // ✅ Properly format content
        });
        return result.embedding.values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}
