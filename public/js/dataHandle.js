// fetch("/api/videos", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json; charset=utf-8"
//   }
// }).then((dbRes) => {
//   var data = dbRes.json();
//   console.log(data);
//   return data;
// }).catch((err) => {
//   console.log(err);
// });

$("document").ready(() => {

  function getVideos() {
    $.getJSON("/api/videos", (data) => {
      // data.forEach(element => {
      //   console.log(element);
      // });
      console.log("2");
      prepCard(data);
    });
  }

  //This function will render data for what is on the page

  function prepCard(video) {
    console.log("3");
    let videoData = $(".video-data");
    let videoCard = [];

    video.forEach(ele => {
      videoCard.push(makeCard(ele));
    });

    videoData.append(videoCard);
  }

  function makeCard(video) {
    console.log("4");
    let card = $("<div class='card'>");
    let cardData = $("<div class='card-data'>").append(
      $(`<a class='video-link' target='_blank' href=${video.link}>`).append(
        $(`<div>`).text(video.title)
      )
    );

    card.append(cardData);
    card.data("_id", video._id);

    return card;
  }

  //This function will scape the api
  function scrape() {
    //Fetch url below, which will automatically scrape youtube for titles and hrefs
    fetch("/api/scrape", {
      method: "GET"
    }).then((res) => {
      console.log("1");
      //Render data
      getVideos();
    });
  }

  $(".video-fetch").on("click", (e) => {
    scrape();
  });
});