<template>
  <div class="chat-container" :class="{ 'minimized': isMinimized }">
    <!-- Chat Header -->
    <div class="chat-header" @click="toggleMinimize">
      <div class="chat-title">
        <q-icon name="smart_toy" class="q-mr-sm" />
        <span>AI Assistant</span>
      </div>
      <div class="chat-controls">
        <q-btn
          flat
          dense
          :icon="isMinimized ? 'expand_less' : 'expand_more'"
          size="sm"
          @click.stop="toggleMinimize"
        />
        <q-btn
          flat
          dense
          icon="close"
          size="sm"
          @click.stop="$emit('close')"
        />
      </div>
    </div>

    <!-- Chat Body -->
    <div v-if="!isMinimized" class="chat-body">
      <div class="messages-container" ref="messagesContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content">
            <div v-if="message.type === 'bot'" class="message-avatar">
              <q-icon name="smart_toy" />
            </div>
            <div class="message-text">{{ message.text }}</div>
            <div v-if="message.type === 'user'" class="message-avatar">
              <q-icon name="person" />
            </div>
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>

        <div v-if="isTyping" class="typing-indicator">
          <q-spinner-dots color="yellow" size="20px" />
          <span>AI is typing...</span>
        </div>
      </div>

      <div class="input-container">
        <q-input
          v-model="userInput"
          placeholder="Ask me anything..."
          dense
          outlined
          dark
          @keyup.enter="sendMessage"
          :loading="isLoading"
        >
          <template v-slot:append>
            <q-btn
              flat
              icon="send"
              :disabled="!userInput.trim() || isLoading"
              @click="sendMessage"
            />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { sendToMockGPT } from 'src/services/gptService'

export default {
  name: 'ChatBox',
  emits: ['close'],
  setup() {
    const messages = ref([
      {
        text: "Hello! I'm your AI assistant. How can I help you today?",
        type: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ])
    const userInput = ref('')
    const isLoading = ref(false)
    const isTyping = ref(false)
    const isMinimized = ref(false)
    const messagesContainer = ref(null)

    const scrollToBottom = async () => {
      await nextTick()
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }

    const toggleMinimize = () => {
      isMinimized.value = !isMinimized.value
    }

    const sendMessage = async () => {
      if (!userInput.value.trim() || isLoading.value) return

      const userMessage = {
        text: userInput.value,
        type: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      messages.value.push(userMessage)
      const currentInput = userInput.value
      userInput.value = ''

      await scrollToBottom()

      isLoading.value = true
      isTyping.value = true

      try {
        const response = await sendToMockGPT(currentInput)

        isTyping.value = false
        messages.value.push({
          text: response,
          type: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })

        await scrollToBottom()
      } catch {
        isTyping.value = false
        messages.value.push({
          text: 'Sorry, I encountered an error. Please try again.',
          type: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })
      } finally {
        isLoading.value = false
      }
    }

    return {
      messages,
      userInput,
      isLoading,
      isTyping,
      isMinimized,
      messagesContainer,
      sendMessage,
      toggleMinimize
    }
  }
}
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  overflow: hidden;
}

.chat-container.minimized {
  height: 60px;
  width: 200px;
}

.chat-header {
  background: #2a2a2a;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid #333;
}

.chat-title {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 600;
}

.chat-controls {
  display: flex;
  gap: 8px;
}

.chat-body {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
}

.message.user {
  align-self: flex-end;
}

.message.bot {
  align-self: flex-start;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message.user .message-content {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc107;
  font-size: 16px;
  flex-shrink: 0;
}

.message-text {
  background: #2a2a2a;
  color: #fff;
  padding: 12px 16px;
  border-radius: 18px;
  word-wrap: break-word;
}

.message.user .message-text {
  background: #ffc107;
  color: #000;
}

.message-time {
  font-size: 11px;
  color: #888;
  margin-top: 4px;
  text-align: center;
}

.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 14px;
  padding: 8px 0;
}

.input-container {
  padding: 16px;
  border-top: 1px solid #333;
}

.input-container .q-input {
  background: #2a2a2a;
  border-radius: 24px;
}

.input-container .q-field__control {
  background: #2a2a2a !important;
}

.input-container .q-field__native {
  color: #fff !important;
}

/* Scrollbar styling */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

@media (max-width: 600px) {
  .chat-container {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
  }
}
</style>
