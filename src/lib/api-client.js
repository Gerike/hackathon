const BASE_URL = 'https://api.assisteve.com';
const SECRET = localStorage.getItem('api-key');

export class ApiClient {

    static async getTickets() {
        const response = await fetch(`${BASE_URL}/zendesk-tickets/`, {
            method: 'GET',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": SECRET
            },
        });

        const data = await response.json()

        return data.data;
    }

    static async sendQuestion(question, sessionId = null) {
        const response = await fetch(`${BASE_URL}/get-response/`, {
            method: 'POST',
            body: JSON.stringify({
                session_id: sessionId,
                input_text: question
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": SECRET
            },
        });
        const data = await response.json()
        return data.data;
    }

    static async ignoreTicket(ticketId) {
        await fetch(`${BASE_URL}/ignore-ticket/`, {
            method: 'POST',
            mode: "no-cors",
            body: JSON.stringify({
                ticket_id: ticketId
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": SECRET
            },
        });
    }
}