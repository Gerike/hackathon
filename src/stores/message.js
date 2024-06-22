import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
  const messages = {};
  function addMessage(ticketId, message) {

    if (!messages[ticketId]) {
      messages[ticketId] = [];
    }

    messages[ticketId].push(message)
  }

  return { messages, addMessage }
})
