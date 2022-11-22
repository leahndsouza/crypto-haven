import axios from 'axios';

const firstInstance = axios.create({
    baseURL: 'https://coinranking1.p.rapidapi.com',
});

const secondInstance = axios.create({
    baseURL: 'https://bing-news-search1.p.rapidapi.com'
});

export { firstInstance, secondInstance };