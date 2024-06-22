<script setup>
import MessageIcon from "@/components/icons/MessageIcon.vue";

const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean
  }
})

const createTitle = () => {
  if (props.msg.length < 20) {
    return props.msg;
  }
  return `${props.msg.slice(0, 17)}...`;
}
</script>

<template>
  <div class="ticketBox" :class="selected ? 'selected' : ''">
    <div class="messageIcon">
      <message-icon></message-icon>
    </div>
    <div class="ticketContent">
      <div class="ticketMessage">{{ createTitle() }}</div>
      <div class="ticketDate">{{ date }}</div>
    </div>
  </div>
</template>

<style scoped>
.ticketBox {
  width: 80%;
  padding: 5px;
  display: flex;
  margin: 5px;
  margin-left: 15px;
  flex-basis: 50%;
}

.messageIcon {
  margin: 5px;
  padding: 5px;
  color: red !important;
}

.ticketContent {
  margin-left: 15px;
}

.ticketBox:hover {
  background-color: var(--message-light);
  border-radius: 10px;
}

.ticketMessage {
  font-weight: bold;
}

.selected {
  background-color: var(--highlight);
  border-radius: 10px;
}

</style>
