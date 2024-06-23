import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {ApiClient} from "@/lib/api-client.js";

export const useMessageStore = defineStore('message', () => {
  const messages = {};
  const sessionId = ref(null);

  async function addMessage(ticketId, message) {
    if (!messages[ticketId]) {
      messages[ticketId] = [];
    }

    if (messages[ticketId].length > 0 && messages[ticketId][messages[ticketId].length -1].message === 'loading') {
      messages[ticketId].pop();
    }

    messages[ticketId].push(message)

    //const data = await ApiClient.sendQuestion(message, sessionId.value)
    //sessionId.value = data.session_id;
    //messages[ticketId].push(data.answer)

  }

  function addLoadingMessage(ticketId) {
    messages[ticketId].push({ fromBot: true, message: 'loading' });
  }

  return { addLoadingMessage, messages, addMessage }
})
