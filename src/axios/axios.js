import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://coinranking1.p.rapidapi.com',
});

export default instance;