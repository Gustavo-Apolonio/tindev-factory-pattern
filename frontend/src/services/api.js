import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/dev"
})

export default function createAPI() {
    async function enter(info) {
        const resp = await api.post('/app', info)
        return resp.data;
    }

    return {
        enter
    }
}
