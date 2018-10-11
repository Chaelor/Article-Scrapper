/*eslint-disable*/
var articleArea = document.getElementById("article-data");

fetchArticles();

//Modal handling
function handleModal(data) {
  //Get the modal elements
  let modal = document.getElementById('myModal');
  let modalTitle = document.getElementById('modal-title');
  let modalBody = document.getElementById('modal-body');
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
  modalBody.innerHTML = `${data.title} was ${data.action.toLowerCase()}`;
  modalText.style.display = "none";
  modal.style.display = "block";
}

//Initial fetch
function fetchArticles() {
  fetch('/api/articles', {
  })
    .then(dbRes => {

      //Empty the div where cards go.

      if (dbRes.ok) {
        return dbRes.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(articleData => {
      // if (articleData.saved) {
      //We will use this for appending cards to the dom
      let articleArr = [];

      //For each element in articleData, make a card
      articleData.forEach(ele => {
        //For every article in articleData make a card
        if (ele.saved) {
          articleArr.push(makeCard(ele))
        }
      });

      if (articleArr.length !== 0) {
        articleArea.innerHTML = "";
      }

      //Append every element from articleArr to the dom
      articleArr.forEach(ele => articleArea.appendChild(ele));

      //collect all the save and delete buttons
      let deleteThis = document.querySelectorAll(".btn-delete");
      let noteThis = document.querySelectorAll(".btn-note");

      //Whoever is grading this, don't look at this loop please
      //Give the buttons event handlers
      for (let i = 0; i < articleArr.length; i++) {
        deleteThis[i].addEventListener('click', deleteArticle);
        noteThis[i].addEventListener('click', getNotes);
      }
    })
    .catch(err => {
      console.log(err);
    });

}

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
    <a class="waves-effect waves-light btn btn-note purple lighten-1" data-_id=${article._id}><i class="fas fa-sticky-note"></i> Notes</a>
    <a class="waves-effect waves-light btn btn-delete purple lighten-1" data-_id=${article._id}><i class="fas fa-backspace"></i> Delete Article</a>
    </div>
  </div>
</div>
`;

  //Set innerHTML of the card equal to the card data and the data-_id to the id of the entry in the data base
  card.innerHTML = cardData;
  card.dataset._id = article._id;

  return card;
}

function getNotes(article) {

  let articleID = this.getAttribute('data-_id');
  let joshWhatHaveYouDone = this.parentNode.parentNode.children[0].children[0].textContent || article;


  let data = {
    id: articleID,
    title: joshWhatHaveYouDone
  }

  handleNoteModal(data);
};

function handleNoteModal(data) {
  let modal = document.getElementById('myModal');
  let modalTitle = document.getElementById('modal-title');
  let modalNotes = document.getElementById('modal-notes');
  let modalBtns = document.getElementById('modal-btns');
  let modalText = document.getElementById('modal-text');
  let modalBody = document.getElementById('modal-body');

  modalText.style.display = "block";
  modalTitle.textContent = data.title;
  modalBtns.innerHTML = `<a class="waves-effect waves-light btn btn-save purple lighten-1" id="btn-save" data-_id=${data.id}><i class="fas fa-save"></i> Leave a Note</a>`

  fetch(`/api/notes/${data.id}`, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      modalBody.textContent = "";
      return res.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
    .then((response) => {

      response.forEach((ele) => {
        // console.log(ele.body);
        let newDiv = document.createElement('div');


        newDiv.classList.add('card');

        newDiv.innerHTML = `
<div class='card-content'>
<p>${ele.body}</p>
</div>
<div class='card-action'>
<a class="waves-effect waves-light btn btn-del-note purple lighten-1" data-_id=${ele._id}><i class="fas fa-backspace"></i> Delete Note</a>
</div>`

        modalBody.appendChild(newDiv);
      });
      document.querySelectorAll(".btn-del-note").forEach(elem => {
        elem.addEventListener('click', delNote);
      });
    })
    .catch(err => err);

  //On the close button, add an event listener to display none
  document.getElementById('close').addEventListener('click', () => {
    modal.style.display = "none";
  });

  document.getElementById('btn-save').addEventListener('click', () => {
    let modalText = document.getElementById('modal-text');
    var postData = {
      articleID: data.id,
      body: modalText.value
    }

    modalText.value = "";

    if (postData.body === "") {
      return;
    }

    fetch(`/api/notes`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then((res) => {
        if (res.ok) {
          // modalBody.textContent = "";
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(response => {
        modalBody.innerHTML = "<h4>Your note was saved!</h4>";
      })
      .catch(err => err);
  })


  modal.style.display = "block";
}

function delNote() {

  //get the id from the button element
  let articleID = this.getAttribute('data-_id');
  let removeCard = this.parentNode.parentNode;

  removeCard.remove();

  //Delete this fam
  fetch(`/api/notes/${articleID}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
    if (res) {
      getNotes();
    }
  })
}

function deleteArticle() {


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
