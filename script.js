// function to fetch data from FreeAPI YouTube endpoint
async function fetchVideos(page = 1) {
  const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}`;
  const options = {method: 'GET', headers: {accept: 'application/json'}};
  
  console.log('fetch request')

  try {
    let responce = await fetch(url, options)
    let data = await responce.json()
    return data.data.data
  } catch (error) {
    console.log('Error while fetching data ', error)
    return null
  }
}

// initilizing required variables
let videoData = [];
let page = 1;

// grab required elements
const videoGrid = document.querySelector('.videoGrid')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')

// function to get data from fetchVideos() and displaying it on page
// As we can't use the await at global level this function will do all job for us
async function fetchAndUseVideos(page = 1, searchQuery = '') {
  // clear the previous elements of videoGrid
  videoGrid.innerHTML = ''

  // if search query is then only we fetch the data from FreeAPI YouTube endpoint
  if(!searchQuery) {
    const newVideos = await fetchVideos(page);
    videoData.push(...newVideos)
    console.log(videoData)
    displayVideos(videoData)
  }
  
  // if search query is provided we will only filter the exsiting videoData based on tags
  // we will not make any api call as per requirment
  if(searchQuery && videoData) {
    let searchResult = []

    videoData.map((video) => {
      video?.items?.snippet?.tags?.forEach((tag) => {
        if(tag.toLowerCase() === searchQuery.toLowerCase()){
          searchResult.push(video)
        }
      })
    })

    displayVideos(searchResult)
    searchInput.value = ''
  }

}

// to fetch and display videos on initial page load
fetchAndUseVideos(page++);

// function to create video div's and append them into videoGrid element for give array of videos
function displayVideos(videoArr) {
  videoArr.forEach(video => {
    const videoDiv = document.createElement('div')
    videoDiv.classList.add('videoDiv')
  
    videoDiv.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${video.items.id}" target="_blank">
              <div class="img-hover-zoom">
                <img id="videoThumbnail" src="${video.items.snippet.thumbnails.standard.url}" alt="${video.items.snippet.title} thumbnail">
              </div>
              <div class="videoInfo">
                <p id="videoTitle">${video.items.snippet.title}</p>
                <p id="videoChannel">${video.items.snippet.channelTitle}</p>
              </div>
          </a>`

    videoGrid.appendChild(videoDiv)
  });
}

// event listener for loadMore button and search button
loadMoreButton.addEventListener('click', () => fetchAndUseVideos(page++))
searchButton.addEventListener('click', () => fetchAndUseVideos(page, searchInput.value.trim()))