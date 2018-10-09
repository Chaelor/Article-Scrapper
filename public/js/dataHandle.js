
//Event handlers
document.getElementById("video-fetch").addEventListener('click', scrape);

//Initial fetch
function fetchVideos() {
  console.log("2");
  fetch('/api/videos')
    .then(dbRes => {
      if (dbRes.ok) {
        return dbRes.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(videoData => {
      //For each element in videoData, make a card
      videoData.forEach(ele => {
        makeCard(ele);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

//function makes cards from data passed in via fetchVideos
function makeCard(video) {
  console.log("3");

  //Selecting // Creating dom elements
  let card = document.createElement("div");
  let videoData = document.querySelector(".video-data");

  //Add class "card" to the created card div
  card.classList.add('card');

  //This is what we will set the innerHTML of on the card.
  let cardData = `
  <div class='card-data'>
  <a class='video-link' target='_blank' href="${video.link}">
  ${video.title}
  </a>
</div>
`;

  //Set innerHTML of the card equal to the card data and the data-_id to the id of the entry in the data base
  card.innerHTML = cardData;
  card.dataset._id = video._id;

  //Append the card to the div
  videoData.appendChild(card);
}

//This function will scape the api
function scrape() {
  //Fetch url below, which will automatically scrape youtube for titles and hrefs
  fetch("/api/scrape", {
    method: "GET"
  }).then((dbRes) => {
    if (dbRes.ok) {
      return dbRes.json();
    } else {
      throw new Error('Something went wrong');
    }
  }).then((res) => {
    console.log("1");
    if (res) {
      fetchVideos();
    }
  }).catch(err => {
    console.log(err);
  });
}
