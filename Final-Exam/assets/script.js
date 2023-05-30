const API_URL = "   http://localhost:8080/houses";
let cards = document.querySelector(".featured-cards");
let sortUsers = document.querySelector(".sort");
let search = document.querySelector(".search");
let header = document.querySelector("header");
let inputDescription = document.querySelector("#inputdescription");
let inputCaption = document.querySelector("#inputcaption");

const favCard = JSON.parse(localStorage.getItem("fav-cards")) || [];

let isEditing = false;

function cardBody(data) {
  cards.innerHTML = "";
  console.log(data);
  data.forEach((element) => {
    cards.innerHTML += `
    <div class="col-sm-12 col-lg-4 featured-card">
                <img src="${element.photo}" alt="" />
                <div class="cards-detail">
                  <h5>${element.title}</h5>
                  <p>
                  ${element.content}
                  </p>
                  <div class="rooms">
                    <div class="rooms-content">
                      <p>Bedrooms</p>
                      <div class="room-img">
                        <img src="./assets/img/bedroom.png" alt="" />
                        <span>4</span>
                      </div>
                    </div>
                    <div class="rooms-content">
                      <p>Bedrooms</p>
                      <div class="room-img">
                        <img src="./assets/img/shower.png" alt="" />
                        <span>3</span>
                      </div>
                    </div>
                    <div class="rooms-content">
                      <p>Bedrooms</p>
                      <div class="room-img">
                        <img src="./assets/img/area.png" alt="" />
                        <span>7100 Sq Ft</span>
                      </div>
                    </div>
                    <div class="rooms-content">
                      <p>Bedrooms</p>
                      <div class="room-img">
                        <img src="./assets/img/patio.png" alt="" />
                        <span>1</span>
                      </div>
                    </div>
                    <div class="rooms-content">
                      <p>Bedrooms</p>
                      <div class="room-img">
                        <img src="./assets/img/garage.png" alt="" />
                        <span>2</span>
                      </div>
                    </div>
                  </div>

                  <div class="featured-buttons">
                    <div class="featured-button">
                      <p>Hottub</p>
                    </div>
                    <div class="featured-button">
                      <p>Swimming Pool</p>
                    </div>
                    <div class="featured-button">
                      <p>Garden</p>
                    </div>
                    <div class="featured-button">
                      <p>Patio</p>
                    </div>
                    <div class="featured-button">
                      <p>Hard Wood Floor</p>
                    </div>
                  </div>
                  <span class="crud-icons">
                  <a href="#" onclick=favoriteCard('${element.id}')><i class="fa-regular fa-heart"></i></a>
                    <a href="form.html?id=${element.id}" onclick=editCard('${element.id}')><i class="fa-regular fa-pen-to-square"></i></a>
                    <a href="#" onclick=deleteCard('${element.id}')><i class="fa-solid fa-trash-can"></i></a>
                  </span>
                </div>

                <div class="featured-price">
                  <i class="fa-solid fa-tags"></i>
                  <div class="sale">
                    <span>For Sale</span>
                    <p>$ ${element.price}</p>
                  </div>
                </div>
              </div>`;
  });
}

async function getAllInfo() {
  const response = await fetch(`${API_URL}`);
  const data = await response.json();
  cardBody(data);
}
getAllInfo();

function deleteCard(id) {
  axios.delete(`${API_URL}/${id}`);
  console.log("id");
  getAllInfo();
}

sortUsers.addEventListener("click", function () {
  if (this.innerHTML == "Ascending") {
    axios(`${API_URL}`).then((res) => {
      let sortAsc = res.data.sort((a, b) => a.price - b.price);
      console.log("if", sortAsc);
      cardBody(sortAsc);
    });
    sortUsers.innerHTML = "Descending";
  } else if (this.innerHTML == "Descending") {
    axios(API_URL).then((res) => {
      let sortDes = res.data.sort((a, b) => b.price - a.price);
      cardBody(sortDes);
      console.log("else if", sortDes);
    });
    this.innerHTML = "Default";
  } else {
    axios(API_URL).then((res) => {
      cardBody(res.data);
    });
    this.innerHTML = "Ascending";
  }
});

search.addEventListener("input", function (event) {
  axios(API_URL).then((res) => {
    let filtered = res.data.filter((item) =>
      item.title
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
    );
    console.log(filtered);

    cardBody(filtered);
  });
});

let isAvailable;

async function favoriteCard(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  const data = await res.data;

  let isAvailable = favCard.find((user) => user.id === data.id);

  if (!isAvailable) {
    favCard.push(data);
    localStorage.setItem("fav-cards", JSON.stringify(favCard));
  } else {
    alert("Error");
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY>100) {
    header.style.backgroundColor = "#0e1d41";
    header.style.transition = "all 0.7s";
  }else{
    header.style.backgroundColor = "transparent";
  }
});
