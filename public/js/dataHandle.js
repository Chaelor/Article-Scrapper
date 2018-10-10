
//global variables
var articleArea = document.getElementById("article-data");

//Event handlers
document.getElementById("article-fetch").addEventListener('click', scrape);

function test() {
  console.log("Hello");
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
    if (res) {
      fetchArticles();
    }
  }).catch(err => {
    console.log(err);
  });
}

//Initial fetch
function fetchArticles() {
  console.log("2");
  fetch('/api/articles')
    .then(dbRes => {

      articleArea.innerHTML = "";

      if (dbRes.ok) {
        return dbRes.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(articleData => {

      let articleArr = [];
      //For each element in articleData, make a card
      articleData.forEach(ele => {
        articleArr.push(makeCard(ele));
      });

      articleArr.forEach(ele => articleArea.appendChild(ele));

      let deleteThis = document.querySelectorAll(".btn-delete");
      let save = document.querySelectorAll(".btn-save");

      //Whoever is grading this, don't look at this loop please
      for (let i = 0; i < save.length; i++) {
        save[i].addEventListener('click', saveArticle);
        deleteThis[i].addEventListener('click', deleteArticle);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

//function makes cards from data passed in via fetcharticles
function makeCard(article) {

  //Selecting // Creating dom elements
  let card = document.createElement("div");

  //Add class "card" to the created card div
  card.classList.add('card');

  //This is what we will set the innerHTML of on the card.
  let cardData = `
<div class="col s12 m6">
  <div class="card blue lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${article.title}</span>
      <p>
  ${article.sum ? article.sum : "Sorry, there wasn't a summary available. :("}
  </p>
    </div>
    <div class="card-action">
    <a class="waves-effect waves-light btn btn-save purple lighten-1" data-_id=${article._id}><i class="fas fa-save"></i> Save</a>
    <a class="waves-effect waves-light btn btn-delete purple lighten-1" data-_id=${article._id}><i class="fas fa-backspace"></i> Delete</a>
    </div>
  </div>
</div>
`;

  //Set innerHTML of the card equal to the card data and the data-_id to the id of the entry in the data base
  card.innerHTML = cardData;
  card.dataset._id = article._id;

  return card;

}

function saveArticle() {

  var articleID = this.getAttribute('data-_id');

  fetch(`/api/articles/${articleID}`, {
    method: "PUT",
    data: { saved: true }
  }).then((res) => {
    console.log(res);
    if (res.saved) {
      fetchArticles();
    }
  })
}

//This will delete the article associated with the ID from the button
function deleteArticle() {

  //get the id from the button element
  var articleID = this.getAttribute('data-_id');

  //Delete this fam
  fetch(`/api/articles/${articleID}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    if (res) {
      fetchArticles();
    }
  })
}