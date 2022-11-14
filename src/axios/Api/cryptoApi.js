import axios from "../axios";

export function getStats(count) {
    let url = count ? `/coins?limit=${count}`: '/coins';
    const headers = {
        headers: {
            'X-RapidAPI-Key': '9cd7400355mshd0a6982b9663453p136d71jsn01c26fc73bb1',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    return axios.get(url,headers);
}