<script setup>
import IconCommunity from "@/components/icons/IconCommunity.vue";

defineProps({
  msg: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="ticketBox">
    <div class="messageIcon">
      <icon-community></icon-community>
    </div>
    <div class="ticketContent">
      <div class="ticketMessage">{{ msg }}</div>
      <div class="ticketDate">{{ date }}</div>
    </div>
  </div>
</template>

<style scoped>
.ticketBox {
  width: 80%;
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
  background-color: #797979;
  border-radius: 10px;
}

.ticketMessage {
  font-weight: bold;
}

</style>
