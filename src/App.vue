<script setup>

import TicketItem from "@/components/TicketItem.vue";
</script>

<template>
    <div class="wrapper">
      <div class="ticketPanel">
        <div class="ticketPanelHeader">
          <h3>(Assistive Tech Bot)</h3>
          <div class="search">
            <input type="text" class="searchTerm" placeholder="Search">
          </div>
        </div>
        <div class="ticketPanelTicketList">
          <TicketItem date="2024.01.01" msg="Ticket 1"></TicketItem>
          <TicketItem date="2024.01.01" msg="Ticket 2"></TicketItem>
          <TicketItem date="2024.01.01" msg="Ticket 3"></TicketItem>
        </div>
      </div>
      <div class="chatPanel">ALMAFA</div>
    </div>
</template>
<style>
body {
  margin: 0;
}
</style>


<style scoped>
.wrapper {
  display: flex;
  height: 100vh;
}

.ticketPanel {
  margin: 0;
  flex: 40%;
  background-color: #D9D9DA;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.ticketPanelHeader {
  border-bottom: 1px solid black;
}

.ticketPanelHeader h3 {
  font-size: 24px;
  font-weight: 600;
  padding: 16px;
}

.search {
  padding-left: 16px;
  padding-bottom: 16px;
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 80%;
  border: 1px solid #797979;
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
  color: #9DBFAF;
}

.searchTerm:focus {
  border: 1px solid #6d8dff;
}

.searchTerm:focus{
  color: #292929;
}
.divider {
  width: 100%;
}



.chatPanel {
  flex: 60%;
}
</style>
