import axios from 'axios'

const API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here'
const API_URL = 'https://api.openai.com/v1/chat/completions'

export const sendToGPT = async (message, conversationHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are a helpful AI assistant for a portfolio website. You help visitors understand the portfolio owner's skills, projects, and experience. Be professional, friendly, and concise in your responses.`
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error calling GPT API:', error)

    // Fallback responses for common scenarios
    const fallbackResponses = [
      "I'm here to help! What would you like to know about this portfolio?",
      "Feel free to ask me about the projects, skills, or experience showcased here.",
      "I'm ready to assist you with any questions about this portfolio."
    ]

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
  }
}

import { profile } from '../data/profileData.js'

// Mock service for development/testing without API key
export const sendToMockGPT = async (message) => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('name')) {
    return `The name of the portfolio owner is ${profile.name}.`
  }

  if (lowerMessage.includes('title')) {
    return `${profile.name}'s title is ${profile.title}.`
  }

  if (lowerMessage.includes('summary')) {
    return profile.summary;
  }

  if (lowerMessage.includes('contact')) {
    let response = 'You can contact them via:'
    profile.contacts.forEach(contact => {
      response += `\n- ${contact.label}: ${contact.value}`
    })
    return response
  }

  if (lowerMessage.includes('socials')) {
    let response = 'You can find them on:'
    profile.socials.forEach(social => {
      response += `\n- ${social.name}: ${social.url}`
    })
    return response
  }

  if (lowerMessage.includes('skill')) {
    let response = 'Their skills include:'
    for (const [category, skills] of Object.entries(profile.skills)) {
      response += `\n- ${category}: ${Array.isArray(skills) ? skills.join(', ') : skills}`
    }
    return response
  }

  if (lowerMessage.includes('project')) {
    let response = 'Here are some of their projects:'
    profile.projects.forEach(project => {
      response += `\n- ${project.name}: ${project.description}`
    })
    return response
  }

  if (lowerMessage.includes('education')) {
    let response = 'Here is their education background:'
    profile.education.forEach(edu => {
      response += `\n- ${edu.degree} from ${edu.institution} (${edu.period})`
    })
    return response
  }

  const mockResponses = {
    'hello': `Hello! I'm an AI assistant for ${profile.name}'s portfolio. How can I help you?`,
    'default': `I'm sorry, I can't answer that question right now. You can ask me about ${profile.name}'s summary, skills, projects, education, or contact information.`
  }

  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return mockResponses.default
}
