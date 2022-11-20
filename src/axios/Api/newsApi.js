import { secondInstance } from '../axios';

export function getNews(category,count) {
    console.log('cat',category);
    let url = `/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`;
    const headers = {
        headers: {
            'X-BingApis-SDK': 'true',
            'X-RapidAPI-Key': '9cd7400355mshd0a6982b9663453p136d71jsn01c26fc73bb1',
            'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
          }
    };
    return secondInstance.get(url,headers);
}