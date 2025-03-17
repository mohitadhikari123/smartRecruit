import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/models/Candidate";
import { extractTextFromPDF } from "@/utils/resumeParser";
import { summarizeResume, generateCandidateFeedback, generateEmbeddings } from "@/lib/gemini";
import { storeResumeInPinecone } from "@/lib/pinecone";
import { cosineSimilarity } from "@/utils/cosineSimilarity";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const linkedIn = formData.get("linkedIn");
    const skills = formData.get("skills");
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    if (!name || !email || !linkedIn || !skills || !resumeFile || !jobDescription) {
      console.error("Validation Error: Missing fields");
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Extract text from resume from the file buffer
    let resumeText;
    try {
      const resumeBuffer = await resumeFile.arrayBuffer();
      resumeText = await extractTextFromPDF(resumeBuffer);

      if (!resumeText) {
        return NextResponse.json({ success: false, error: "Failed to extract text from resume" }, { status: 400 });
      }
    } catch (extractError) {
      console.error("Error extracting text from resume:", extractError);
      return NextResponse.json({ success: false, error: "Failed to extract text from resume" }, { status: 500 });
    }

    // Generate embeddings
    let jobDescriptionEmbedding, candidateEmbedding;
    try {
      jobDescriptionEmbedding = await generateEmbeddings(jobDescription);
      candidateEmbedding = await generateEmbeddings(resumeText);
    } catch (embedError) {
      console.error("Error generating embeddings:", embedError);
      return NextResponse.json({ success: false, error: "Failed to generate embeddings" }, { status: 500 });
    }

    const similarityScore = cosineSimilarity(jobDescriptionEmbedding, candidateEmbedding);

    // Summarize resume
    let summary;
    try {
      summary = await summarizeResume(resumeText);
      if (!summary) {
        return NextResponse.json({ success: false, error: "Failed to summarize resume" }, { status: 500 });
      }
    } catch (summaryError) {
      console.error("Error summarizing resume:", summaryError);
      return NextResponse.json({ success: false, error: "Failed to summarize resume" }, { status: 500 });
    }

    // Generate candidate feedback
    let feedback;
    try {
      feedback = await generateCandidateFeedback(summary, jobDescription);
      if (typeof feedback === "string") {
        feedback = feedback.replace(/[*#]/g, "");
      }
      if (!feedback) {
        return NextResponse.json({ success: false, error: "Failed to generate candidate feedback" }, { status: 500 });
      }
    } catch (feedbackError) {
      console.error("Error generating candidate feedback:", feedbackError);
      return NextResponse.json({ success: false, error: "Failed to generate candidate feedback" }, { status: 500 });
    }

    const newCandidate = new Candidate({
      name,
      email,
      linkedIn,
      skills: skills.split(",").map((skill) => skill.trim()),
      resumeText,
      jobDescription,
      similarityScore,
      summary,
      feedback,
    });

    await newCandidate.save();

    await storeResumeInPinecone(newCandidate._id.toString(), resumeText);

    return NextResponse.json({
      feedback,
      score: similarityScore,
      success: true,
      message: "Candidate saved, summarized, and indexed successfully!",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}