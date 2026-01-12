
import { GoogleGenAI, Type } from "@google/genai";
import { Blueprint } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getArchitecturalAdvice = async (prompt: string): Promise<Blueprint> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are a world-class Full-Stack Web Architect. 
      Your goal is to provide a detailed technical blueprint for building a dynamic website based on a user's idea. 
      Analyze the requirements for frontend (React/Next), backend (Node/Go/Python), and database (SQL/NoSQL).
      Ensure the response follows the exact JSON schema provided.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          architecture: { type: Type.STRING },
          frontendStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          backendStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          databaseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                table: { type: Type.STRING },
                fields: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["table", "fields"]
            }
          },
          keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "description", "architecture", "frontendStack", "backendStack", "databaseSchema", "keyFeatures"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithArchitect = async (history: { role: string, content: string }[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are an expert web development consultant. Help the user understand how to build dynamic features like authentication, CRUD, real-time updates, and state management. Keep answers technical but accessible."
    }
  });
  
  // Since we don't have a built-in history formatter for this specific SDK in the example, 
  // we follow the prompt structure.
  const result = await chat.sendMessage({ message });
  return result.text;
};
