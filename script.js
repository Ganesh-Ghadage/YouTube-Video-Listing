// const fetch = require('node-fetch');
// import fetch  from 'node-fetch';

async function fetchVideos(page = 1) {
    const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
}

fetchVideos()

