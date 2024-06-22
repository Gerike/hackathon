<script setup>
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
    <div class="ticketMessage">{{ msg }}</div>
    <div class="ticketDate">{{ date }}</div>
  </div>
</template>

<style scoped>
.ticketBox {
  width: 80%;

}

</style>
