import { streamText } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import connectDB from "@/lib/db"
import SymptomConversation from "@/models/SymptomConversation"
import { verifyToken, getTokenFromHeaders } from "@/lib/api-utils"
import { v4 as uuidv4 } from "uuid"

// Create an OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
})

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json()

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
- Keep responses concise but informative

DISCLAIMER: Always end your responses with a brief reminder that this is general health information and not a substitute for professional medical advice.`

  try {
    // Try to save conversation to database (non-blocking)
    const token = getTokenFromHeaders(req.headers)
    if (token) {
      const decoded = verifyToken(token)
      if (decoded) {
        // Save asynchronously without blocking the response
        saveConversation(decoded.userId, sessionId || uuidv4(), messages).catch(console.error)
      }
    }

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in symptom checker API:", error)
    
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

// Helper function to save conversation
async function saveConversation(userId: string, sessionId: string, messages: any[]) {
  try {
    await connectDB()
    
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: new Date(),
    }))

    // Extract symptoms from user messages
    const userMessages = messages.filter((m: any) => m.role === 'user')
    const symptoms = userMessages.map((m: any) => m.content).slice(0, 5)

    await SymptomConversation.findOneAndUpdate(
      { sessionId },
      {
        userId,
        sessionId,
        messages: formattedMessages,
        symptoms,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    )
  } catch (error) {
    console.error('Error saving conversation:', error)
  }
}
