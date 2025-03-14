import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/db";
import Candidate from "@/models/Candidate";
import { extractTextFromPDF } from "@/utils/resumeParser";
import { summarizeResume, generateCandidateFeedback } from "@/lib/gemini";
import { storeResumeInPinecone } from "@/lib/pinecone";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const linkedIn = formData.get("linkedIn");
    const skills = formData.get("skills");
    const resumeFile = formData.get("resume");

    if (!name || !email || !linkedIn || !skills || !resumeFile) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Save resume file
    const resumePath = path.join(uploadDir, resumeFile.name);
    await writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()));

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(resumePath);

    // Generate resume summary and AI feedback
    const summary = await summarizeResume(extractedText);
    const feedback = await generateCandidateFeedback(summary, "Job description will be provided later");

    // Save candidate data to MongoDB
    const newCandidate = new Candidate({
      name,
      email,
      linkedIn,
      skills: skills.split(",").map((skill) => skill.trim()),
      resumePath: `/uploads/${resumeFile.name}`,
      extractedText,
      summary,
      feedback,
    });

    await newCandidate.save();

    // Store resume vector in Pinecone
    await storeResumeInPinecone(newCandidate._id.toString(), extractedText);

    return NextResponse.json({ success: true, message: "Candidate saved, summarized, and indexed successfully!" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
