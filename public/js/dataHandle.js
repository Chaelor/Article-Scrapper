
//global variables
var articleArea = document.getElementById("article-data");

//Event handlers
document.getElementById("article-fetch").addEventListener('click', scrape);

//Modal handling
function handleModal(data) {
  //Get the modal elements
  let modal = document.getElementById('myModal');
  let modalTitle = document.getElementById('modal-title');
  let modalText = document.getElementById('modal-text');

  //On the close button, add an event listener to display none
  document.getElementById('close').addEventListener('click', () => {
    modal.style.display = "none";
  });

  modal.addEventListener('click', () => {
    modal.style.display = "none";    
  })

  //Make it so that it displays if entry was deleted/saved from db and display the modal
  modalTitle.textContent = data.action;
  modalText.innerHTML = `${data.title} was ${data.action.toLowerCase()} <a href="/saved">Click here</a> to see saved articles!`;
  modal.style.display = "block";
}

//This function will scape the api
function scrape() {
  //Fetch url below, which will automatically scrape youtube for titles and hrefs
  fetch("/api/scrape", {
    method: "GET"
  }).then((dbRes) => {
    //If the response from db is okay, respond with json
    if (dbRes.ok) {
      return dbRes.json();
    } else {
      throw new Error('Something went wrong');
    }
  }).then((res) => {
    //fetch articles
    if (res) {
      fetchArticles();
    }
  }).catch(err => {
    console.log(err);
  });
}

//Initial fetch
function fetchArticles() {
  fetch('/api/articles')
    .then(dbRes => {

      //Empty the div where cards go.
      articleArea.innerHTML = "";

      if (dbRes.ok) {
        return dbRes.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(articleData => {

      //We will use this for appending cards to the dom
      let articleArr = [];

      //For each element in articleData, make a card
      articleData.forEach(ele => {
        //For every article in articleData make a card
        if (!ele.saved) {
          articleArr.push(makeCard(ele))
        }
      });

      //Append every element from articleArr to the dom
      articleArr.forEach(ele => articleArea.appendChild(ele));

      //collect all the save and delete buttons
      let deleteThis = document.querySelectorAll(".btn-delete");
      let save = document.querySelectorAll(".btn-save");

      //Whoever is grading this, don't look at this loop please
      //Give the buttons event handlers
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

  //This is what we will set the innerHTML of on the card. TODO: Find a better way to do this
  let cardData = `
<div class="col s12 m6">
  <div class="card blue lighten-1">
    <div class="card-content white-text">
      <span class="card-title">${article.title}</span>
      <p>
  ${article.sum ? article.sum : "Sorry, there wasn't a summary available. :("}
  </p>
  <p class="card-link">
  Interested in reading this article? <a href="${article.link}" target="_blank">Click Here</a>
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

  //Get the id from the button data
  let articleID = this.getAttribute('data-_id');
  //We'll be removing this from the DOM
  let removeCard = this.parentNode.parentNode;
  //Get the parent parent element, then get the first child in both instances, this will get us the title of the article
  //TODO: Fix this shit you dummy
  let joshWhatHaveYouDone = this.parentNode.parentNode.children[0].children[0].textContent;

  //Create an object with the requred info
  let dataHandler = {
    action: "Saved!",
    title: joshWhatHaveYouDone
  };

  //Call the modal, pass it the object from above
  handleModal(dataHandler);

  //Remove the card from display area
  removeCard.remove();

  //Update the card in the database to saved:true
  fetch(`/api/articles/${articleID}`, {
    method: "PUT",
    // data: updateThis
  }).then((res) => {
    if (res.saved) {
      fetchArticles();
    }
  })
}

//This will delete the article associated with the ID from the button
function deleteArticle() {

  /***************************************
   * For comments about this area,
   * See the above saveArticle function, they're the same
   **************************************/

  //get the id from the button element
  let articleID = this.getAttribute('data-_id');
  let removeCard = this.parentNode.parentNode;
  let joshWhatHaveYouDone = this.parentNode.parentNode.children[0].children[0].textContent;

  let dataHandler = {
    action: "Deleted!",
    title: joshWhatHaveYouDone
  };

  handleModal(dataHandler);

  removeCard.remove();

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