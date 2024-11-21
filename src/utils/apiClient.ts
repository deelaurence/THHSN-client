import axios from 'axios';
export const apiClient = axios.create({
    baseURL:window.location.protocol.startsWith('http')?
    'http://localhost:3000':
    ''
})

