
function scrape() {
  fetch("/api/scrape", {
    method: "GET"
  }).then((res) => {
    let scrappedData = document.getElementById("scrappedData");
    // scrappedData.innerHTML("My Nigga");
    scrappedData.innerText = res.title;
  })
}
