'use server'

export async function sendChatMessage(messages: { role: string, content: string }[]) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "You are the VoxTalent AI Assistant. Your job is to help candidates, employees, and companies use the VoxTalent platform. VoxTalent is a merit-based hiring platform where companies post challenges, candidates submit solutions anonymously, and internal employees vote on them to find the best talent. Be concise, friendly, and helpful." 
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from OpenAI");
    }

    const data = await response.json();
    return { success: true, message: data.choices[0].message.content };
  } catch (error: any) {
    console.error("Chatbot Error:", error);
    return { success: false, error: "Sorry, I am having trouble connecting right now." };
  }
}
