import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Candidate from "@/models/Candidate";
import { extractTextFromPDF } from "@/utils/resumeParser";

export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const resumeFile = formData.get("resume");
    const manualResumeText = formData.get("resumeText");

    if (!name || !email || (!resumeFile && !manualResumeText)) {
      console.error("Validation Error: Missing fields");
      return NextResponse.json({ success: false, error: "Name, email, and either resume file or resume text are required" }, { status: 400 });
    }

    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 409 }); 
    }

    let resumeText;

    if (resumeFile) {
      // Handle PDF file upload
      const resumeBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(resumeBuffer);
      const uint8Array = new Uint8Array(buffer);

      resumeText = await extractTextFromPDF(uint8Array);

      if (!resumeText) {
        return NextResponse.json({ success: false, error: "Failed to extract text from resume" }, { status: 400 });
      }
    } else {
      // Handle manual text input
      resumeText = manualResumeText.trim();
      
      if (!resumeText) {
        return NextResponse.json({ success: false, error: "Resume text cannot be empty" }, { status: 400 });
      }
    }

    const newCandidate = new Candidate({
      name,
      email,
      resumeText,
    });

    await newCandidate.save();

    return NextResponse.json({
      success: true,
      message: "Candidate profile and resume parsed successfully!",
      candidateId: newCandidate._id,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}