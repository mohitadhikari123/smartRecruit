import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/models/Candidate";
import { summarizeResume, generateCandidateFeedback, generateEmbeddings } from "@/lib/gemini";
import { storeResumeInPinecone } from "@/lib/pinecone";
import { cosineSimilarity } from "@/utils/cosineSimilarity";

export async function POST(req) {
    try {
        await connectDB();
        const { candidateId, jobDescription } = await req.json();

        if (!candidateId || !jobDescription) {
            console.error("Validation Error: Missing fields");
            return NextResponse.json({ success: false, error: "Candidate ID and job description are required" }, { status: 400 });
        }

        const candidate = await Candidate.findById(candidateId);

        if (!candidate) {
            return NextResponse.json({ success: false, error: "Candidate not found" }, { status: 404 });
        }

        const resumeText = candidate.resumeText;

        const [jobDescriptionEmbedding, candidateEmbedding] = await Promise.all([
            generateEmbeddings(jobDescription),
            generateEmbeddings(resumeText),
        ]);

        if (!jobDescriptionEmbedding) {
            return NextResponse.json({ success: false, error: "Failed to generate job description embedding" }, { status: 400 });
        }

        const similarityScore = cosineSimilarity(jobDescriptionEmbedding, candidateEmbedding);

        let summary, feedback;

        [summary, feedback] = await Promise.all([
            summarizeResume(resumeText),
            generateCandidateFeedback(resumeText, jobDescription),
        ]);

        if (!summary) {
            return NextResponse.json({ success: false, error: "Failed to summarize resume" }, { status: 500 });
        }

        if (typeof feedback === "string") {
            feedback = feedback.replace(/[*#]/g, "");
        }

        if (!feedback) {
            return NextResponse.json({ success: false, error: "Failed to generate candidate feedback" }, { status: 500 });
        }

        candidate.jobDescription = jobDescription;
        candidate.similarityScore = similarityScore;
        candidate.summary = summary;
        candidate.feedback = feedback;

        await Promise.all([
            candidate.save(),
            storeResumeInPinecone(candidate._id.toString(), resumeText),
        ]);

        return NextResponse.json({
            feedback,
            score: similarityScore,
            success: true,
            message: "Job description processed and candidate updated successfully!",
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}