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
    return `The portfolio belongs to **${profile.name}**.`
  }

  if (lowerMessage.includes('title')) {
    return `**${profile.name}** is a **${profile.title}**.`
  }

  if (lowerMessage.includes('summary')) {
    return `Here is a summary of **${profile.name}**'s profile:\n\n${profile.summary}`;
  }

  if (lowerMessage.includes('contact')) {
    let response = 'You can contact **' + profile.name + '** through the following channels:\n\n'
    profile.contacts.forEach(contact => {
      response += `*   **${contact.label}:** ${contact.value}\n`
    })
    return response
  }

  if (lowerMessage.includes('socials')) {
    let response = 'You can find **' + profile.name + '** on the following platforms:\n\n'
    profile.socials.forEach(social => {
      response += `*   **${social.name}:** [${social.url}](${social.url})\n`
    })
    return response
  }

  if (lowerMessage.includes('skill')) {
    let response = 'Here is a breakdown of **' + profile.name + '**\'s skills:\n\n'
    for (const [category, skills] of Object.entries(profile.skills)) {
      response += `*   **${category}:** ${Array.isArray(skills) ? skills.join(', ') : skills}\n`
    }
    return response
  }

  if (lowerMessage.includes('project')) {
    let response = 'Here are some of the projects **' + profile.name + '** has worked on:\n\n'
    profile.projects.forEach(project => {
      response += `*   **${project.name}:** ${project.description}\n`
    })
    return response
  }

  if (lowerMessage.includes('education')) {
    let response = 'Here is **' + profile.name + '**\'s educational background:\n\n'
    profile.education.forEach(edu => {
      response += `*   **${edu.degree}** from ${edu.institution} (${edu.period})\n`
    })
    return response
  }

  const mockResponses = {
    'hii': 'hii hello how are you',
    'hello': 'hii hello how are you',
    'default': `I apologize, but I am unable to answer that question at this time. I can provide information about **${profile.name}**'s summary, skills, projects, education, or contact details.`
  }

  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) {
      return response
    }
  }

  return mockResponses.default
}