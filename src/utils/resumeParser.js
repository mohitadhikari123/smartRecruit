import pdfParse from "pdf-parse/lib/pdf-parse.js";

export async function extractTextFromPDF(pdfData) {
    try {
        let dataBuffer;

        if (pdfData instanceof Uint8Array || pdfData instanceof Buffer) {
            dataBuffer = pdfData;
        } else if (typeof pdfData === "string") {
            const fs = await import("fs/promises");
            dataBuffer = await fs.readFile(pdfData);
        } else {
            throw new Error("Invalid input: pdfData must be a file path, Uint8Array, or Buffer.");
        }

        const pdfContent = await pdfParse(dataBuffer);
        return pdfContent.text.replace(/\n/g, " ").replace(/\s+/g, " ");
        } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return null;
    }
}