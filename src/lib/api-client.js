const BASE_URL = 'https://www.example.com'
const SECRET = 'almafa';

export class ApiClient {

    static async getTickets() {
        const response = await fetch(`${BASE_URL}/zendesk-tickets/`, {
            method: 'POST',
            body: JSON.stringify({
                secret: SECRET
            })
        });
        const data = await response.json()

        return data.data;
    }

    static async sendQuestion(question, sessionId = null) {
        const response = await fetch(`${BASE_URL}/get-response/`, {
            method: 'POST',
            body: JSON.stringify({
                secret: SECRET,
                session_id: sessionId,
                input_test: question
            })
        });

        const data = await response.json()

        return data.data;
    }
}