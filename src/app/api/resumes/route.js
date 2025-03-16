import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
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

    // Save resume file
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const resumePath = path.join(uploadDir, resumeFile.name);
    await writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()));

    // Extract text from resume
    const resumeText = await extractTextFromPDF(resumePath);

    const jobDescriptionEmbedding = await generateEmbeddings(jobDescription);
    const candidateEmbedding = await generateEmbeddings(resumeText);
    const similarityScore = cosineSimilarity(jobDescriptionEmbedding, candidateEmbedding);

    const summary = await summarizeResume(resumeText);

    let feedback = await generateCandidateFeedback(summary, jobDescription);

    if (typeof feedback === "string") {
      feedback = feedback.replace(/[*#]/g, "");
    }

    const newCandidate = new Candidate({
      name,
      email,
      linkedIn,
      skills: skills.split(",").map((skill) => skill.trim()),
      resumePath: `/uploads/${resumeFile.name}`,
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