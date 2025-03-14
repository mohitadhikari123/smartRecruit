import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export const parseResume = async (file) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    return null;
  }
};
