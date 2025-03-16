import { NextResponse } from 'next/server'; // Import NextResponse
import { connectDB } from '@/lib/db';
import Candidate from '@/models/Candidate';
import { generateEmbeddings } from '@/lib/gemini';
import { cosineSimilarity } from '@/utils/cosineSimilarity';

export async function POST(req) { // No res argument
    try {
        await connectDB();
        const { jobDescription } = await req.json(); 

        if (!jobDescription) {
            return NextResponse.json({ error: 'Job description is required' }, { status: 400 }); // 
        }


        const jobDescriptionEmbedding = await generateEmbeddings(jobDescription.trim());

        const candidates = await Candidate.find({});

        const rankedCandidates = await Promise.all(
            candidates.map(async (candidate) => {
                if (candidate.resumeText && candidate.resumeText.trim()) {
                    try {
                        const candidateEmbedding = await generateEmbeddings(candidate.resumeText.trim());
                        const similarityScore = cosineSimilarity(
                            jobDescriptionEmbedding,
                            candidateEmbedding
                        );
                        return { ...candidate.toObject(), similarityScore };
                    } catch (embedError) {
                        console.error("Error generating candidate embedding:", embedError);
                        return { ...candidate.toObject(), similarityScore: 0 }; 
                    }
                } else {
                    console.warn("Skipping candidate due to empty resume text.");
                    return { ...candidate.toObject(), similarityScore: 0 }; 
                }
            })
        );

        rankedCandidates.sort((a, b) => b.similarityScore - a.similarityScore);

        return NextResponse.json({ rankedCandidates }, { status: 200 });
    } catch (error) {
        console.error('Error ranking candidates:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 }); 
    }
}