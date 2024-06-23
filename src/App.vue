<script setup>

import TicketItem from "@/components/TicketItem.vue";
import ChatPanelMessage from "@/components/ChatPanelMessage.vue";
import {useMessageStore} from "@/stores/message.js";
import { useTicketStore } from "@/stores/ticket.js";
import {nextTick, onUpdated, ref} from "vue";
import MessageIcon from "@/components/icons/MessageIcon.vue";
import ProfileIcon from "@/components/icons/ProfileIcon.vue";
import ThemeIcon from "@/components/icons/ThemeIcon.vue";
import Logout from "@/components/icons/Logout.vue";
import {ApiClient} from "@/lib/api-client.js";

const ticketStore = useTicketStore();
const messageStore = useMessageStore();

const shouldRender = ref(false);

ticketStore.fetchTickets().then(() => {
  shouldRender.value = true;
  ticketStore.selectFirstTicket();
});



// messageStore.addMessage(1, { fromBot: false, message: 'There is an error message showing when a participant is trying to use the "download all" button in their briefcase on eLearning'} );
// messageStore.addMessage(1, { fromBot: true, message: 'Some very nice and detailed answer...'});
// messageStore.addMessage(1, { fromBot: true, message: 'feedback\n12345 Title of the first relevant ticket\n23456 Title of the relevant second ticket'});
//
// messageStore.addMessage(2, { fromBot: false, message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tellus est, interdum non arcu nec, convallis interdum tortor. Ut malesuada enim a vestibulum cursus. Etiam consectetur porttitor eros ac rhoncus. Suspendisse nec dignissim magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis arcu purus, vitae tristique elit pharetra bibendum. Aenean a erat erat. Mauris facilisis nisi libero, eu auctor arcu posuere quis. In ullamcorper augue non quam mollis aliquam. In eget nisi efficitur, pharetra ante ac, luctus felis. Curabitur malesuada eros eget massa condimentum, vel vulputate nunc facilisis. Nulla pellentesque nunc id urna viverra cursus.'});
// messageStore.addMessage(2, { fromBot: true, message: 'Praesent nec diam maximus, placerat turpis quis, blandit tellus. Curabitur at placerat arcu. Integer pellentesque elit et risus tristique, vel egestas arcu laoreet. Ut faucibus auctor neque, nec venenatis odio eleifend a. Vivamus porttitor nulla sed nisi ultrices consequat. Integer nibh ante, porta et egestas eu, tincidunt sed magna. Nulla eu elementum turpis.'});
//
// messageStore.addMessage(3, { fromBot: true, message: 'Curabitur semper vel neque ut congue. Sed hendrerit mattis egestas. Pellentesque quis urna volutpat libero facilisis fermentum sit amet ut ipsum. Praesent libero risus, malesuada ut felis id, mattis imperdiet libero. Fusce eu facilisis risus. In enim felis, imperdiet vitae vestibulum vitae, tincidunt eu neque. Nam rutrum volutpat eros, commodo fermentum eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean malesuada pharetra convallis. Curabitur pretium nec diam non aliquam. Aenean semper, metus ut gravida tincidunt, leo nunc tincidunt nunc, sit amet consequat diam nibh eget lectus.'});
// messageStore.addMessage(3, { fromBot: false, message: 'Curabitur in aliquam sem. Phasellus venenatis ultrices odio, eu molestie metus sollicitudin sit amet. Vivamus ex ante, consectetur eu feugiat eu, consectetur vel tortor. Vestibulum id nunc ac mi imperdiet facilisis et vitae velit. Nam et iaculis ante. Etiam et condimentum metus. Aenean id imperdiet lectus, quis imperdiet ante. Integer consectetur semper tellus vel consectetur. Fusce quis lacus gravida nibh facilisis convallis nec a orci. Suspendisse sit amet tempor magna. Maecenas id metus tristique, pharetra libero sit amet, suscipit dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris fermentum risus ac massa commodo tincidunt. Integer id ultrices quam, ac gravida odio. Sed vestibulum elit sit amet erat congue auctor.'});
// messageStore.addMessage(3, { fromBot: true, message: 'Phasellus semper convallis tincidunt. Duis eu urna est. Proin quis tortor porta, ullamcorper magna id, lobortis massa. Nam pulvinar neque sit amet magna facilisis faucibus. Morbi sit amet lorem sed sapien feugiat suscipit. Morbi vel velit quis massa porttitor feugiat eget quis nulla. Aenean efficitur aliquet risus et interdum. Aenean sagittis turpis quis leo mattis rutrum. Duis fringilla tempus eros, vel fermentum lacus rhoncus non. Sed commodo lorem urna, vel consequat mauris consequat in. Etiam sagittis aliquet quam eu scelerisque. Sed id finibus augue. Nullam accumsan ex eget elit pulvinar, at malesuada nibh pellentesque. Morbi convallis metus id tortor hendrerit consectetur. Donec aliquet lectus sit amet lectus pulvinar, quis rhoncus tellus mattis.'});
// messageStore.addMessage(3, { fromBot: true, message: 'Praesent nec diam maximus, placerat turpis quis, blandit tellus. Curabitur at placerat arcu. Integer pellentesque elit et risus tristique, vel egestas arcu laoreet. Ut faucibus auctor neque, nec venenatis odio eleifend a. Vivamus porttitor nulla sed nisi ultrices consequat. Integer nibh ante, porta et egestas eu, tincidunt sed magna. Nulla eu elementum turpis.'});



const askQuestion = async (e) => {
  const question = e.target.value;
  messageStore.addMessage(ticketStore.selectedTicket, { fromBot: false, message: question });
  messageStore.addLoadingMessage(ticketStore.selectedTicket);
  e.target.value = '';
  forceUpdate();

  const response = await ApiClient.sendQuestion(question);
  messageStore.addMessage(ticketStore.selectedTicket, { fromBot: true, message: response.answer });
  console.log(response);
  forceUpdate();
  setTimeout(scrollToLastMessage, 50);
}

const scrollToLastMessage = () => {
  const messageContainers = document.getElementsByClassName('chatPanelMessage');
  if (messageContainers.length > 0) {
    messageContainers[messageContainers.length-1].scrollIntoView();
  }
}

let isLightTheme = ref(true);

const switchTheme = () => {
  isLightTheme.value = !isLightTheme.value;
  document.documentElement.setAttribute("data-theme", isLightTheme.value ? 'light' : 'dark');
}

const forceUpdate = async () => {
  shouldRender.value = false;
  await nextTick();
  shouldRender.value = true;
}

const createNewChat = () => {
  const id = ticketStore.addTicket();
  ticketStore.selectTicket(id);
};

onUpdated(() => {
  scrollToLastMessage();
})

</script>
<template>
    <div class="wrapper" v-if="shouldRender">
      <div class="ticketPanel">
        <div class="ticketPanelHeader">
          <div class="logo">
            <img v-if="isLightTheme" alt="Logo" src="./assets/logo.svg" width="150px"/>
            <img v-else alt="Logo" src="./assets/logo_dark.svg" width="150px"/>
          </div>
        </div>
        <div class="ticketPanelList">
          <div class="search">
            <input type="text" class="searchTerm" placeholder="Search" @keyup="e => ticketStore.setFilterWord(e.target.value)">
          </div>
          <div class="recent">Recent</div>
          <TicketItem v-for="ticket in ticketStore.getTickets()"
            :id="ticket.id"
            :msg="ticket.name"
            :date="ticket.date"
            :selected="ticketStore.selectedTicket === ticket.id"
            @click="ticketStore.selectTicket(ticket.id)"
            @forceupdate="forceUpdate()"
          >
          </TicketItem>
        </div>

        <div class="ticketPanelToolbar">
          <div class="newChatButton" @click="createNewChat()"></div>
        </div>
      </div>
      <div class="chatPanel">
        <div class="chatPanelTitle">
              <div class="messageIcon">
                <message-icon></message-icon>
              </div>
              <div class="chatPanelTitleMessage">{{ ticketStore.getSelectedTicket() ? ticketStore.getSelectedTicket().name : ''}}</div>
          <div class="chatPanelSettings">
            <div class="action-icon" @click="switchTheme"><theme-icon></theme-icon></div>
            <div class="action-icon"><profile-icon></profile-icon></div>
            <div class="action-icon"><logout></logout></div>
          </div>
          </div>
        <div id="chatPanelTextArea" class="chatPanelTextArea">
          <ChatPanelMessage
              class="chatPanelMessage"
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
:root {
  --background-dark: #F2F2F2;
  --background-light: white;
  --message-light: #C5FFF1;
  --message-dark: #289D8C;
  --highlight: #D9D9DA;
  --border: #D9D9DA;
  --logo-light: #48FED5;
  --text-color-light: #030D14;
}

:root[data-theme="dark"] {
    --background-dark: #030F17;
    --background-light: #051826;
    --message-light: #289D8C;
    --message-dark: #054F4F;
    --highlight: #054F4F;
    --border: #7A7F7F;
    --logo-light: #48FED5;
    --text-color-light: white;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  color: var(--text-color-light);
}
</style>

<style scoped>
.ticketPanelToolbar{
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 12px 20px 0 20px;
}

.newChatButton {
  margin-left: auto;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background: var(--message-dark) url('./assets/plus icon.svg') no-repeat center;
  transition: background-color 0.5s ease;
  cursor: pointer;
}
.newChatButton:hover {
  background-color: var(--message-light);
}

.action-icon {
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  padding: 5px;
  align-content: center;
  margin: auto;
  transition: background-color 0.5s ease;
  border-radius: 8px;
  cursor: pointer;
}
.action-icon svg {
  margin: auto;
}
.action-icon:hover {
  background-color: #48FED5;
}
.logo {
  box-sizing: border-box;
  padding: 16px 20px 16px 20px;
  background-color: var(--background-dark);
  border-bottom: 1px solid var(--border);
  height: 65px;
}


.recent {
  margin-top: 20px;
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: var(--text-color-light);
}
.messageIcon {
  align-self: center;
  margin-right: 12px;
}

.chatPanelTitle {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 65px;
  background-color: var(--background-dark);
  border-bottom: var(--border);
  padding: 8px 20px 8px 20px;
}

.chatPanelSettings {
  align-self: center;
  margin-right: 0;
  margin-left: auto;
  flex-direction: row;
  display: flex;
}

.chatPanelTextArea {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100% - 65px - 72px);
  overflow: scroll;
  background-color: var(--background-light);
}
.chatBoxInput {
  background: var(--background-light) url("./assets/send icon.svg") no-repeat right;
  background-position-x: calc(100% - 10px);
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-radius: 10px;
  border: solid 1px var(--border);
  color: var(--text-color-light);
}

.chatPanelControls {
  box-sizing: border-box;
  padding: 16px 20px 16px 20px;
  height: 72px;
  width: 100%;
  display: flex;
  border-top: solid 1px var(--border);
  background-color: var(--background-dark);
}

.chatPanelTitleMessage {
  font-weight: 600;
  align-self: center;
}

.wrapper {
  display: flex;
  height: 100vh;
}

.ticketPanel {
  margin: 0;
  width: 350px;
  background-color: var(--background-dark);
  border-right: 1px solid var(--border);
}

.ticketPanelList {
  padding: 16px;
  box-sizing: border-box;
  height: calc(100% - 65px - 72px);
  overflow: scroll;
}


.ticketPanelHeader h3 {
  font-size: 24px;
  font-weight: 600;
  padding-left: 16px;
}

.search {
  width: 100%;
  margin: auto;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 1px solid var(--border);
  padding: 5px;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
  background: var(--background-light);
  color: var(--text-color-light);
}

.searchTerm:focus {
  border: 1px solid #6d8dff;
}

.chatPanel {
  width: 100%;
}
</style>
