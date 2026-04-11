import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeSubmission(challengeDescription: string, candidateContent: string) {
  // Use 'gemini-1.5-flash-latest' for better compatibility
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const prompt = `
    You are a technical merit assessor for a talent platform called VoxTalent.
    Your job is to provide a "Technical Verdict" for a candidate's submission based on a challenge description.

    ### CHALLENGE DESCRIPTION:
    ${challengeDescription}

    ### CANDIDATE'S SUBMISSION:
    ${candidateContent}

    ### INSTRUCTIONS:
    1. Evaluate the submission based on technical accuracy, completeness, and clarity.
    2. Assign a "Lemon Intensity" score from 0 to 10.
       - 0 Lemons = Excellence (No technical flaws).
       - 10 Lemons = Total failure (Significant technical flaws or incorrect implementation).
    3. Provide a brief, professional technical critique (max 3 sentences).
    
    Return your response in EXACTLY this JSON format:
    {
      "lemonCount": number,
      "critique": "string"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from potential markdown fluff
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error: any) {
    console.error("AI Analysis failed:", error);
    // For demo stability: if AI fails, we return a special object
    // that the UI can use to show an "Upgrade to Pro" message
    return {
      isDemo: true,
      lemonCount: 10,
      critique: "Upgrade to VoxTalent Pro for deep technical critiques and automated lemon scoring."
    };
  }
}
