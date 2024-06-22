<script setup>
import IconCommunity from "@/components/icons/IconCommunity.vue";

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
      <icon-community></icon-community>
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
}

.ticketContent {
  margin-left: 15px;
}

.ticketBox:hover {
  background-color: var(--highlight);
  border-radius: 10px;
}

.ticketMessage {
  font-weight: bold;
}

.selected {
  background-color: #6d8dff !important;
  border-radius: 10px;
}

</style>
