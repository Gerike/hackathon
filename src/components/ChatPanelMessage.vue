<script setup>

import {ref} from "vue";

const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  leftAlign: {
    type: Boolean,
  }
})

const isFeedbackMessage = props.msg.split('\n')[0] === 'feedback';
const isLoadingMessage = props.msg === 'loading';
const relevantTickets = [];

const createFeedbackMessageContent = () => {
  const messageContent = props.msg.split('\n')
  const ticketsInfo = messageContent.splice(1, messageContent.length);

  relevantTickets.push(...ticketsInfo
      .map(relevantTicketInfo => {
        const [id, ...title] = relevantTicketInfo.split(' ')
        return {id, title: title.join(' ')}
      }));
}

if (isFeedbackMessage) {
  createFeedbackMessageContent();
}

const ZENDESK_TICKET_URL = 'https://www.zendesk.com/tickets'
</script>

<template>
  <div v-if="isFeedbackMessage" class="messageBox" :class="leftAlign ? 'left-aligned' : 'right-aligned'">
    <div class="link-container" v-for="ticket in relevantTickets">
      <div class="link">•  #{{ ticket.id }}: <a target="_blank" :href="`${ZENDESK_TICKET_URL}/${ticket.id}`" ><strong>{{ ticket.title }}</strong> <img alt="external-link" src="../assets/external-link.svg" width="16px"/></a></div>
      <div class="feedback-button approve-button"><img alt="external-link" src="../assets/thumbs-up.svg" width="16px"/>Approve</div>
      <div class="feedback-button ignore-button"><img alt="external-link" src="../assets/thumbs-down.svg" width="16px"/>Ignore</div>
    </div>
  </div>
  <div v-else-if="isLoadingMessage" class="messageBox" :class="leftAlign ? 'left-aligned' : 'right-aligned'"><div class="loader"></div></div>
  <div v-else class="messageBox" :class="leftAlign ? 'left-aligned' : 'right-aligned'">{{ msg }}</div>
</template>

<style scoped>
a, a:hover, a:visited {
  outline: none;
  border:none;
  text-decoration:none;
  color:inherit;
}

.loader {
  width: 60px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background:
      var(--_g) 0%   50%,
      var(--_g) 50%  50%,
      var(--_g) 100% 50%;
  background-size: calc(100%/3) 100%;
  animation: l7 1s infinite linear;
  margin-bottom: 5px;
}
@keyframes l7 {
  33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
  50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
  66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
}

.link {
  cursor: pointer;
  margin-bottom: 8px;
}

.link-container {
  margin-bottom: 16px;
}


.feedback-button {
  text-align: center;
  align-content: center;
  display: inline-flex;
  border-radius: 4px;
  border: 1.5px solid var(--message-dark);
  box-sizing: border-box;
  padding: 4px 12px 4px 12px;
  width: 112px;
  height: 28px;
  margin-right: 8px;
  margin-left: 8px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.feedback-button:hover {
  background-color: var(--background-light);
  color: var(--text-color-light);
}

.feedback-button img {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 4px;
  color: var(--text-color-light);
}

.messageBox {
  box-sizing: border-box;
  width: 60%;
  border-radius: 8px;
  padding: 12px;
  margin-top: 10px;
}

.left-aligned {
  margin-left: 10px;
  color: black;
  background-color: var(--message-light);
}

.right-aligned {
  background-color: var(--message-dark);
  color: white;
  margin-left: auto;
  margin-right: 10px
}

</style>
