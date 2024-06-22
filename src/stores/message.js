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

    messages[ticketId].push(message)
    //const data = await ApiClient.sendQuestion(message, sessionId.value)
    //sessionId.value = data.session_id;
    //messages[ticketId].push(data.answer)

  }

  return { messages, addMessage }
})
