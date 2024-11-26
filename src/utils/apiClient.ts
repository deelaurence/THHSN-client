import axios from 'axios';
export const apiClient = axios.create({
    baseURL:window.location.protocol.startsWith('https')?
    'https://thhsn-api.onrender.com':
    'http://localhost:3000'
})


