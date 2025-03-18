import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Candidate from '@/models/Candidate';
import { getGeminiSimilarityScore } from '@/lib/gemini';

export async function POST(req) {
    try {
        await connectDB();
        const { jobDescription } = await req.json();

        if (!jobDescription) {
            return NextResponse.json({ error: 'Job description is required' }, { status: 400 });
        }

        const candidates = await Candidate.find({});

        const validCandidates = candidates.filter(candidate => candidate.resumeText && candidate.resumeText.trim());

        if (validCandidates.length === 0) {
            return NextResponse.json({ rankedCandidates: [] }, { status: 200 });
        }

        const similarityScores = await getGeminiSimilarityScore(validCandidates, jobDescription);
        console.log('similarityScores: ', similarityScores);

        const rankedCandidates = validCandidates.map((candidate, index) => ({
            ...candidate.toObject(),
            similarityScore: similarityScores[index] || 0,
        }));

        rankedCandidates.sort((a, b) => b.similarityScore - a.similarityScore);

        return NextResponse.json({ rankedCandidates }, { status: 200 });
    } catch (error) {
        console.error('Error ranking candidates:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}