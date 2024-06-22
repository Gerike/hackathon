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
    <icon-community class="messageIcon"></icon-community>
    <span class="ticketMessage">{{ msg }}</span>
  </div>
</template>

<style scoped>
.ticketBox {
  width: 80%;
  margin: 5px;
}

.messageIcon {
  display: inline;
  margin: 5px
}

.ticketMessage {
  margin: auto;
}

.ticketBox:hover {
  background-color: #797979;
  border-radius: 10px;
}

</style>
