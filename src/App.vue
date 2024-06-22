<script setup>

import TicketItem from "@/components/TicketItem.vue";
import ChatPanelMessage from "@/components/ChatPanelMessage.vue";
import {useMessageStore} from "@/stores/message.js";
import { useTicketStore } from "@/stores/ticket.js";

const ticketStore = useTicketStore();
const messageStore = useMessageStore();

ticketStore.fetchTickets();
ticketStore.selectFirstTicket();

messageStore.addMessage(1, { fromBot: false, message: 'There is an error message showing when a participant is trying to use the "download all" button in their briefcase on eLearning'} );
messageStore.addMessage(1, { fromBot: true, message: 'Some very nice and detailed answer...'});

messageStore.addMessage(2, { fromBot: false, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus est, interdum non arcu nec, convallis interdum tortor. Ut malesuada enim a vestibulum cursus. Etiam consectetur porttitor eros ac rhoncus. Suspendisse nec dignissim magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis arcu purus, vitae tristique elit pharetra bibendum. Aenean a erat erat. Mauris facilisis nisi libero, eu auctor arcu posuere quis. In ullamcorper augue non quam mollis aliquam. In eget nisi efficitur, pharetra ante ac, luctus felis. Curabitur malesuada eros eget massa condimentum, vel vulputate nunc facilisis. Nulla pellentesque nunc id urna viverra cursus.'});
messageStore.addMessage(2, { fromBot: true, message: 'Praesent nec diam maximus, placerat turpis quis, blandit tellus. Curabitur at placerat arcu. Integer pellentesque elit et risus tristique, vel egestas arcu laoreet. Ut faucibus auctor neque, nec venenatis odio eleifend a. Vivamus porttitor nulla sed nisi ultrices consequat. Integer nibh ante, porta et egestas eu, tincidunt sed magna. Nulla eu elementum turpis.'});

messageStore.addMessage(3, { fromBot: true, message: 'Curabitur semper vel neque ut congue. Sed hendrerit mattis egestas. Pellentesque quis urna volutpat libero facilisis fermentum sit amet ut ipsum. Praesent libero risus, malesuada ut felis id, mattis imperdiet libero. Fusce eu facilisis risus. In enim felis, imperdiet vitae vestibulum vitae, tincidunt eu neque. Nam rutrum volutpat eros, commodo fermentum eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean malesuada pharetra convallis. Curabitur pretium nec diam non aliquam. Aenean semper, metus ut gravida tincidunt, leo nunc tincidunt nunc, sit amet consequat diam nibh eget lectus.'});
messageStore.addMessage(3, { fromBot: false, message: 'Curabitur in aliquam sem. Phasellus venenatis ultrices odio, eu molestie metus sollicitudin sit amet. Vivamus ex ante, consectetur eu feugiat eu, consectetur vel tortor. Vestibulum id nunc ac mi imperdiet facilisis et vitae velit. Nam et iaculis ante. Etiam et condimentum metus. Aenean id imperdiet lectus, quis imperdiet ante. Integer consectetur semper tellus vel consectetur. Fusce quis lacus gravida nibh facilisis convallis nec a orci. Suspendisse sit amet tempor magna. Maecenas id metus tristique, pharetra libero sit amet, suscipit dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris fermentum risus ac massa commodo tincidunt. Integer id ultrices quam, ac gravida odio. Sed vestibulum elit sit amet erat congue auctor.'});
messageStore.addMessage(3, { fromBot: true, message: 'Phasellus semper convallis tincidunt. Duis eu urna est. Proin quis tortor porta, ullamcorper magna id, lobortis massa. Nam pulvinar neque sit amet magna facilisis faucibus. Morbi sit amet lorem sed sapien feugiat suscipit. Morbi vel velit quis massa porttitor feugiat eget quis nulla. Aenean efficitur aliquet risus et interdum. Aenean sagittis turpis quis leo mattis rutrum. Duis fringilla tempus eros, vel fermentum lacus rhoncus non. Sed commodo lorem urna, vel consequat mauris consequat in. Etiam sagittis aliquet quam eu scelerisque. Sed id finibus augue. Nullam accumsan ex eget elit pulvinar, at malesuada nibh pellentesque. Morbi convallis metus id tortor hendrerit consectetur. Donec aliquet lectus sit amet lectus pulvinar, quis rhoncus tellus mattis.'});
messageStore.addMessage(3, { fromBot: true, message: 'Praesent nec diam maximus, placerat turpis quis, blandit tellus. Curabitur at placerat arcu. Integer pellentesque elit et risus tristique, vel egestas arcu laoreet. Ut faucibus auctor neque, nec venenatis odio eleifend a. Vivamus porttitor nulla sed nisi ultrices consequat. Integer nibh ante, porta et egestas eu, tincidunt sed magna. Nulla eu elementum turpis.'});


const askQuestion = (e) => {
  const question = e.target.value;
  messageStore.addMessage(ticketStore.selectedTicket, { fromBot: false, message: question });
  const selectedTicket = ticketStore.selectedTicket;
  ticketStore.selectTicket(null);
  ticketStore.selectTicket(selectedTicket);
  e.target.value = '';
}
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
          <TicketItem v-for="ticket in ticketStore.tickets"
            :msg="ticket.name"
            :date="ticket.date"
            :selected="ticketStore.selectedTicket === ticket.id"
            @click="ticketStore.selectTicket(ticket.id)">
          </TicketItem>
        </div>
      </div>
      <div class="chatPanel">
        <div class="chatPanelTitle">
          <div class="chatPanelTitleMessage">Ticket 1 title</div>
          <div class="chatPanelTitleDate">14:32, 22 June</div>
        </div>
        <div class="chatPanelTextArea">
          <ChatPanelMessage
              v-for="message in messageStore.messages[ticketStore.selectedTicket]"
              :key="message.message"
              :msg="message.message"
              :left-align="message.fromBot"
          >
          </ChatPanelMessage>
        </div>
        <div class="chatPanelControls">
          <input type="text" class="chatBoxInput" placeholder="Write your question" v-on:keyup.enter="e => askQuestion(e)">
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
  overflow: scroll;
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
  flex: 20%;
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
