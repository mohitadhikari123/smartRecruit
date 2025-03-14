import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function extractTextFromPDF(filePath) {
    try {
        // Check if file exists
        await fs.access(filePath);

        const dataBuffer = await fs.readFile(filePath);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return null;
    }
}
