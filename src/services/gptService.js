import axios from 'axios'
import { profile } from '../data/profileData.js'

const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE' // Use environment variable
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export const sendToGPT = async (message, conversationHistory = []) => {
  try {
    const systemInstruction = `You are a sophisticated AI assistant for the portfolio of Mohammad Sinan Ali, a Software Developer. Your role is to provide visitors with a comprehensive understanding of his skills, projects, and professional background.

Your communication style should be:
- **Professional and Formal:** Maintain a respectful and formal tone at all times.
- **Structured and Clear:** Use markdown for formatting. For example, use lists to present skills or projects, and use bolding to highlight key terms.
- **Human-like and Engaging:** Be conversational and approachable. Proactively offer additional information and ask clarifying questions if the user's query is ambiguous.
- **Helpful and Knowledgeable:** Your goal is to be as helpful as possible. Provide detailed and accurate information based on the portfolio data.

When asked about specific topics, provide detailed information. For example:
- When asked about "skills", provide a categorized list of skills.
- When asked about "projects", provide a summary of each project.
- When asked about "education", list the educational qualifications with the institution and period.

Always strive to provide a response that is as informative and helpful as a top-tier AI assistant like Google Gemini.

Here is the portfolio data:
Name: ${profile.name}
Title: ${profile.title}
Summary: ${profile.summary}
Contacts: ${JSON.stringify(profile.contacts)}
Socials: ${JSON.stringify(profile.socials)}
Skills: ${JSON.stringify(profile.skills)}
Projects: ${JSON.stringify(profile.projects)}
Education: ${JSON.stringify(profile.education)}
`

    const messages = []

    // Add system instruction as part of the first user message
    if (conversationHistory.length === 0) {
      messages.push({
        role: 'user',
        parts: [{ text: systemInstruction + '\n\n' + message }]
      });
      messages.push({
        role: 'model',
        parts: [{ text: 'Understood. I will provide comprehensive and structured responses based on the provided portfolio data, maintaining a professional and engaging tone.' }]
      });
    } else {
      // Add previous conversation history
      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.type === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      });
      // Add the current user message
      messages.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }


    const response = await axios.post(
      API_URL,
      {
        contents: messages,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      },
      {
        headers: {
          'X-goog-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.candidates[0].content.parts[0].text.trim()
  } catch (error) {
    console.error('Error calling Gemini API:', error.response ? error.response.data : error.message)

    const fallbackResponses = [
      "I'm currently experiencing technical difficulties. Please try again later.",
      "I apologize, but I cannot process your request at this moment. Could you please rephrase it?",
      "It seems there's an issue with the AI service. I'm working to resolve it."
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}
