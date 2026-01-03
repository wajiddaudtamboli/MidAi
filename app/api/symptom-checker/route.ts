import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"

// Create an OpenAI provider - you can configure with environment variables
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
})

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // System prompt for the health assistant
  const systemPrompt = `You are MidAi, a helpful AI health assistant. Your role is to:
1. Listen to users describe their symptoms
2. Ask clarifying questions to better understand their condition
3. Provide general health information and guidance
4. Recommend when they should seek professional medical care
5. Never provide definitive diagnoses - always recommend consulting a healthcare professional

Important guidelines:
- Be empathetic and supportive
- Ask about symptom duration, severity, and any other relevant factors
- Mention if symptoms could indicate something that requires immediate medical attention
- Always remind users that you're not a replacement for professional medical advice
- If symptoms seem serious (chest pain, difficulty breathing, severe headache, etc.), strongly recommend seeking immediate medical care
- Keep responses concise but informative`

  try {
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in symptom checker API:", error)
    
    // Fallback response if API key is not configured
    return new Response(
      JSON.stringify({
        error: "AI service not configured. Please set up your OPENAI_API_KEY environment variable.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
