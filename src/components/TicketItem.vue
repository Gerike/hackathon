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
});

const CHARACTER_LIMIT = 40;

const createTitle = () => {
  if (props.msg.length < CHARACTER_LIMIT) {
    return props.msg;
  }
  return `${props.msg.slice(0, CHARACTER_LIMIT-3)}...`;
}
</script>

<template>
  <div class="ticketBox" :class="selected ? 'selected' : ''">
    <div class="ticketContentBox">
      <div class="messageIcon">
        <message-icon></message-icon>
      </div>
      <div class="ticketContent">
        <div class="ticketMessage">{{ createTitle() }}</div>
        <div class="ticketDate">{{ date }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticketBox {
  width: 318px;
  height: 49px;
}

.ticketContentBox {
  padding: 8px 12px 8px 12px;
  width: 100%;
  display: flex;
  flex-basis: 50%;
}


.ticketContent {
  margin-left: 5px;
}

.ticketBox:hover {
  background-color: var(--message-light);
  border-radius: 8px;
}

.ticketMessage {
  font-weight: 600;
  font-size: 14px;
}

.ticketDate {
  font-weight: 400;
  font-size: 14px;
}

.selected {
  background-color: var(--highlight);
  border-radius: 8px;
}

</style>
