import { GoogleGenAI } from "@google/genai";
import { STYLE_PRESETS } from "../constants";

// Helper to clean Markdown code blocks from response
const cleanSVGCode = (text: string): string => {
  let cleaned = text.replace(/```xml/g, '').replace(/```svg/g, '').replace(/```/g, '');
  const svgStart = cleaned.indexOf('<svg');
  const svgEnd = cleaned.lastIndexOf('</svg>');
  
  if (svgStart !== -1 && svgEnd !== -1) {
    return cleaned.substring(svgStart, svgEnd + 6);
  }
  return cleaned;
};

export const generateSVG = async (prompt: string, styleId: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  const style = STYLE_PRESETS.find(p => p.id === styleId)?.promptModifier || '';
  
  const systemInstruction = `
    You are an expert SVG artist. 
    Your task is to generate valid, clean, and scalable SVG code based on the user's prompt.
    Adhere to these rules:
    1. Output ONLY the raw SVG code. No explanations, no markdown backticks.
    2. Ensure the SVG has a viewBox.
    3. Use semantic paths and groups where possible.
    4. Style: ${style}
    5. Ensure high contrast and vivid colors if not specified otherwise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || '';
    if (!text) throw new Error("No content generated");
    
    return cleanSVGCode(text);
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};

export const enhancePrompt = async (currentPrompt: string): Promise<string> => {
   const apiKey = process.env.API_KEY;
  if (!apiKey) return currentPrompt;
  
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Improve this prompt for an SVG vector generator to be more descriptive and artistic: "${currentPrompt}". Return only the improved prompt text.`,
    });
    return response.text?.trim() || currentPrompt;
  } catch (e) {
    return currentPrompt;
  }
};
