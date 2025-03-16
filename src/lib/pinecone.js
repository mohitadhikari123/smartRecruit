import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbeddings } from "@/lib/gemini";

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

export async function storeResumeInPinecone(candidateId, resumeText) {
    const embedding = await generateEmbeddings(resumeText);
    await index.upsert([{ id: candidateId, values: embedding }]);
    return true;
}

export async function searchCandidates(jobDescription) {
    const jobEmbedding = await generateEmbeddings(jobDescription);
    const results = await index.query({
        vector: jobEmbedding,
        topK: 5,
        includeMetadata: true,
    });
    return results.matches;
}
