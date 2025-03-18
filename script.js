async function fetchVideos(page = 1) {
  const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}`;
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  
  try {
    let responce = await fetch(url, options)
    let data = await responce.json()
    return data.data.data
  } catch (error) {
    console.log('Error while fetching data ', error)
    return null
  }
}

let videoData;
let page = 1;
const videoGrid = document.querySelector('.videoGrid')
const loadMoreButton = document.getElementById('loadMoreButton')

async function fetchAndUseVideos(page) {
  videoData = await fetchVideos(page);

  videoData.forEach(video => {
    const videoDiv = document.createElement('div')
    videoDiv.classList.add('videoDiv')
  
    videoDiv.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.items.id}" target="_blank">
              <img id="videoThumbnail" src="${video.items.snippet.thumbnails.standard.url}" alt="${video.items.snippet.title} thumbnail">
              <div class="videoInfo">
                  <p id="videoTitle">${video.items.snippet.title}</p>
                  <p id="videoChannel">${video.items.snippet.channelTitle}</p>
              </div>
          </a>`

    videoGrid.appendChild(videoDiv)
    
  });
    
}

fetchAndUseVideos(page++);

loadMoreButton.addEventListener('click', () => fetchAndUseVideos(page++))
