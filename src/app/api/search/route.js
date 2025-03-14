import pinecone from "@/lib/pinecone";
import Candidate from "@/models/Candidate";

export async function POST(req) {
  try {
    const { jobDescription } = await req.json();
    const index = pinecone.index("candidates");

    const queryEmbedding = await generateEmbeddings(jobDescription);
    const results = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const candidateIds = results.matches.map((match) => match.metadata.id);
    const candidates = await Candidate.find({ _id: { $in: candidateIds } });

    return Response.json({ candidates });
  } catch (error) {
    return Response.json({ error: "Search failed" }, { status: 500 });
  }
}
