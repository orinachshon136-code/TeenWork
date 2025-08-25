
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash';

export const generateContent = async (prompt: string, systemInstruction?: string): Promise<string> => {
  if (!API_KEY) {
    return "שירות ה-AI אינו זמין כרגע. אנא ודא שמפתח ה-API מוגדר כראוי.";
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      ...(systemInstruction && { config: { systemInstruction } })
    });
    
    // Using the direct .text accessor as per the guidelines
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};
