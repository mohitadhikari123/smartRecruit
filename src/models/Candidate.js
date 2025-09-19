import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  resumeText: { type: String },
  summary: { type: String, default: "" },
  feedback: { type: String, default: "" },
  similarityScore: { type: Number, default: 0 },
  jobDescription: { type: String }, 
}, { timestamps: true });

const Candidate = mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);

export default Candidate;