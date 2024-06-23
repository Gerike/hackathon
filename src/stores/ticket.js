import { ref } from 'vue'
import { defineStore } from 'pinia'
import {ApiClient} from "@/lib/api-client.js";

export const useTicketStore = defineStore('ticket', () => {
    const tickets = [];
    const selectedTicket = ref(null);
    const filterWord = ref('');
    const newId = ref(0);

    async function fetchTickets() {
        tickets.splice(0, tickets.length);
        // tickets.push({ id: 1, name: 'Download all issue', date: '14:32, 22 June' });
        // tickets.push({ id: 2, name: 'Very very long title so can we trim it after a certain amount of characters?', date: '15:32, 22 June' });
        // tickets.push({ id: 3, name: 'Another download all issue', date: '16:32, 22 June' });

        const t = await ApiClient.getTickets();
        tickets.push(...t.map(((ticket, index) => {
            const creationDate = new Date(ticket.created_at);
            return { id: index, name: ticket.subject, description: ticket.description, date: `${creationDate.getHours()}:${creationDate.getMinutes().toString().padStart(2, '0')}, ${creationDate.getDate()} ${creationDate.toLocaleString('default', { month: 'long' })}` }
        })));

        console.log(t);
        //tickets.push(...await ApiClient.getTickets())
    }

    function removeTicket(ticketId) {
        const ticketIndex = tickets.findIndex(ticket => ticket.id == ticketId);
        if (ticketIndex >= 0) {
            tickets.splice(ticketIndex, 1);
            if (ticketId === selectedTicket.value) {
                selectFirstTicket();
            }
        }
    }

    function addTicket() {
        const currentDate = new Date();
        const ticket ={ id: `new-${newId.value}`, name: 'New Chat', date: `${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, '0')}, ${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })}` }
        tickets.push(ticket);
        newId.value += 1;
        return ticket.id;
    }

    function getSelectedTicket() {
        return tickets.find(ticket => ticket.id === selectedTicket.value);
    }

    function selectTicket(id) {
        selectedTicket.value = id;
    }

    function selectFirstTicket() {
        selectedTicket.value = tickets[0].id;
    }

    function setFilterWord(newFilterWord) {
        filterWord.value = newFilterWord;
    }

    function getTickets() {
        if (filterWord.value.trim() !== '') {
            return tickets.filter(ticket => {
                return ticket.name.toLowerCase().includes(filterWord.value.toLowerCase()) || ticket.date.toLowerCase().includes(filterWord.value.toLowerCase())
            })
        }

        return tickets;
    }

    return { addTicket, removeTicket, getSelectedTicket, tickets, fetchTickets, selectTicket, selectedTicket, selectFirstTicket, setFilterWord, getTickets }
})
