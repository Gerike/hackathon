const BASE_URL = 'https://api.assisteve.com';
const SECRET = '9cd784e1-9535-4e9c-9b91-75cf3b2fa24c';

export class ApiClient {

    static async getTickets() {
        const response = await fetch(`${BASE_URL}/zendesk-tickets/`, {
            method: 'POST',
            mode: "no-cors",
            body: JSON.stringify({
                'auth_token': SECRET
            })
        });

        const data = await response.json()

        return data.data;
    }

    static async sendQuestion(question, sessionId = null) {
        const response = await fetch(`${BASE_URL}/get-response/`, {
            method: 'POST',
            mode: "no-cors",
            body: JSON.stringify({
                'auth_token': SECRET,
                session_id: sessionId,
                input_text: question
            })
        });

        const data = await response.json()

        return data.data;
    }
}