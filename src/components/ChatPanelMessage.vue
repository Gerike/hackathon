<script setup>
import IconCommunity from "@/components/icons/IconCommunity.vue";

defineProps({
  msg: {
    type: String,
    required: true
  },
  leftAlign: {
    type: Boolean,
  }
})
</script>

<template>
  <div class="messageBox" :class="leftAlign ? 'left-aligned' : 'right-aligned'">
 {{ msg }}
  </div>
</template>

<style scoped>
.messageBox {
  width: 60%;
  border-radius: 10px;
  padding: 10px;
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
