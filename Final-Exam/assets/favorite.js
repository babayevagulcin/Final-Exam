const API_URL = "   http://localhost:8080/houses";

let cards = document.querySelector(".fav-boxes");
let header = document.querySelector("header");
let favCard = JSON.parse(localStorage.getItem("fav-cards"));

// header.style.backgroundColor = "#0e1d41";


function getFavCard() {
  cards.innerHTML = "";
  favCard.forEach((element) => {
    cards.innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4 mt-5 box">
    <div class="img-border">
      <img src="${element.photo}" alt="" />
    </div>
    <h4>${element.title}</h4>
    <p>
    ${element.content}
    </p>
    <a href="#" class="btn btn-outline-danger text-secondary"
      >More Details</a
    >
    <a href="#" onclick=deleteCard('${element.id}')><i class="fa-solid fa-trash-can text-danger ms-2"></i></a>
  </div>
  `;
  });
}

getFavCard();

function deleteCard(id) {
  favCard = favCard.filter((user) => user.id != id);
  localStorage.setItem("fav-cards", JSON.stringify(favCard));
  getFavCard();
}
