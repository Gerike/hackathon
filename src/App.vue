<script setup>

import TicketItem from "@/components/TicketItem.vue";
import ChatPanelMessage from "@/components/ChatPanelMessage.vue";
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
          <TicketItem date="14:32, 22 June" msg="Ticket 1 title...."></TicketItem>
          <TicketItem date="14:32, 22 June" msg="Ticket 2 title...."></TicketItem>
          <TicketItem date="14:32, 22 June" msg="Ticket 3 title...."></TicketItem>
        </div>
      </div>
      <div class="chatPanel">
        <div class="chatPanelTitle">
          <div class="chatPanelTitleMessage">Ticket 1 title</div>
          <div class="chatPanelTitleDate">14:32, 22 June</div>
        </div>
        <div class="chatPanelTextArea">
          <ChatPanelMessage msg="There is an error message showing when a participant is trying to use the 'download all' button in their briefcase on eLearning"></ChatPanelMessage>
          <ChatPanelMessage left-align msg="There is some very nice answers..."></ChatPanelMessage>
        </div>
        <div class="chatPanelControls">
          <input type="text" class="chatBoxInput" placeholder="Write your question">
        </div>
      </div>
    </div>
</template>
<style>
body {
  margin: 0;
}

:root {
  --background-dark: #D9D9DA;
  --background-light: white;
  --message-light: #D6F2EE;
  --message-dark: #289D8C;
  --highlight: #656565;
  --border: black;
}
</style>


<style scoped>

.chatPanelTitle {
  width: 100%;
  height: 50px;
  background-color: var(--background-dark);
  border-bottom: var(--border);
  padding-top: 10px;
  padding-left: 10px;
}

.chatPanelTextArea {
  height: calc(90% - 50px);
  padding: 10px;
}
.chatBoxInput {
  width: 80%;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-radius: 10px;
  border: solid 1px var(--border);
}

.chatPanelControls {
  height: calc(10% - 50px);
  width: 100%;
  padding: 10px;
  display: flex;
  border-top: solid 1px var(--border);
  background-color: var(--background-dark);
}

.chatPanelTitleMessage {
  font-weight: bold;
}

.wrapper {
  display: flex;
  height: 100vh;
}

.ticketPanel {
  margin: 0;
  flex: 40%;
  background-color: var(--background-dark);
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.ticketPanelHeader {
  border-bottom: 1px solid black;
}

.ticketPanelHeader h3 {
  font-size: 24px;
  font-weight: 600;
  padding-left: 16px;
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
  border: 1px solid var(--border);
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
}

.searchTerm:focus {
  border: 1px solid #6d8dff;
}

.searchTerm:focus{
  color: #292929;
}

.chatPanel {
  flex: 60%;
}
</style>
