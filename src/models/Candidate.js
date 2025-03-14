import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedIn: { type: String, required: true },
  skills: { type: [String], required: true },
  resumePath: { type: String, required: true },
  extractedText: { type: String }, // Store extracted resume text
}, { timestamps: true });

const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);

export default Candidate;
