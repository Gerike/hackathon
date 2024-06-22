import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', () => {
    const tickets = [];
    const selectedTicket = ref(null);
    const filterWord = ref('');

    async function fetchTickets() {
        tickets.splice(0, tickets.length);
        tickets.push({ id: 1, name: 'Ticket 1 title', date: '14:32, 22 June' });
        tickets.push({ id: 2, name: 'Ticket 2 title', date: '15:32, 22 June' });
        tickets.push({ id: 3, name: 'Ticket 3 title', date: '16:32, 22 June' });
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

    return { tickets, fetchTickets, selectTicket, selectedTicket, selectFirstTicket, setFilterWord, getTickets }
})
