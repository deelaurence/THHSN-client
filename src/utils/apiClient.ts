import axios from 'axios';
export const apiClient = axios.create({
    baseURL:window.location.protocol.startsWith('https')?
    'https://api.thehumanhairshopng.com':
    'http://localhost:3000'
})


