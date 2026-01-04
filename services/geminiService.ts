
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIExplanation = async (concept: string, context: string, strategy: string, strategyEn: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `你是一位專業的SMC（智慧型資金）交易導師。
      請根據以下核心資訊提供一段深度實戰解析：
      
      概念名稱：${concept}
      概念背景：${context}
      實戰交易策略：${strategy}
      策略英文描述：${strategyEn}

      你的目標是提供一段約 150 字內的深度點評。請指出使用此概念時最常見的陷阱、建議觀察的特定確認信號，或是在何種市場環境（Context）下此信號的勝率最高。使用繁體中文，語氣要專業、具備前瞻性且帶有指導意義。`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，目前無法取得 AI 解析。請參考圖表說明。";
  }
};
