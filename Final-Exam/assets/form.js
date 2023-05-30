const API_URL = "http://localhost:8080/houses";
let form = document.querySelector("form");
let image = document.querySelector("#inputfile");
let inputCaption = document.querySelector("#inputtitle");
let inputDescription = document.querySelector("#inputcontent");
let submitBtn = document.querySelector(".submit-btn");
let header = document.querySelector("header");

let id = new URLSearchParams(window.location.search).get("id");

if (id) {
  async function fillForm() {
    const res = await axios(`${API_URL}/${id}`);
    const data = await res.data;
    inputCaption.value = data.title;
    inputDescription.value = data.content;
  }

  fillForm();
}

async function createCard() {
  const user = {
    id: Date.now(),
    photo: `./assets/img/${image.value.split("\\")[2]}`,
    title: inputCaption.value,
    content: inputDescription.value,
  };
  if (inputCaption.value && inputDescription.value && image.value) {
    await axios.post(API_URL, user);
    window.location.href = "index.html";
  } else {
    alert("empty");
  }
}

async function editCard() {
  let obj = {
    id: Date.now(),
    photo: `./assets/img/${image.value.split("\\")[2]}`,
    title: inputCaption.value,
    content: inputDescription.value,
  };

  await axios.patch(`${API_URL}/${id}`, obj);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (id) {
    editCard();
    console.log("id");
  } else {
    createCard();
  }
  window.location.href = "index.html";

});


header.style.backgroundColor = "#0e1d41";
