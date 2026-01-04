
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIExplanation = async (concept: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一位專業的SMC（智慧型資金）交易導師。請根據以下概念：「${concept}」和背景：「${context}」，提供一段簡短、實戰性的交易建議或深度解析。使用繁體中文，語氣專業且鼓勵。`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前無法取得 AI 解析。請參考圖表說明。";
  }
};
