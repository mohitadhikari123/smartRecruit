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
    console.log("Connecting to database...");
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
    console.log("Resume saved at:", resumePath);

    // Extract text from resume
    const extractedText = await extractTextFromPDF(resumePath);
    console.log("Extracted text from PDF:", extractedText.substring(0, 200), "...");

    // Generate summary
    const summary = await summarizeResume(extractedText);
    console.log("Generated summary:", summary);

    // Generate feedback based on job description
    const feedback = await generateCandidateFeedback(summary, jobDescription);
    console.log("Generated feedback:", feedback);

    // Save candidate to MongoDB
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
    console.log("Candidate saved to MongoDB with ID:", newCandidate);
2
    await storeResumeInPinecone(newCandidate._id.toString(), extractedText);
    console.log("Resume indexed in Pinecone");

    return NextResponse.json({ feedback , success: true, message: "Candidate saved, summarized, and indexed successfully!" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
