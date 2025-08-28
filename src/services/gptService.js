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

  const mockResponses = {
    'hello': `Hello! I'm an AI assistant for ${profile.name}'s portfolio. How can I help you?`,
    'projects': 'This portfolio showcases several impressive projects including web applications, mobile apps, and data visualization tools. Would you like details about any specific project?',
    'skills': 'The portfolio owner has expertise in JavaScript, Vue.js, React, Node.js, Python, and various other technologies. They also have experience with cloud platforms and DevOps practices.',
    'experience': 'With several years of experience in full-stack development, the portfolio owner has worked on diverse projects from startups to enterprise solutions.',
    'default': `I'm sorry, I can't answer that question right now. You can ask me about ${profile.name}'s skills, projects, or contact information.`
  }

  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return mockResponses.default
}
