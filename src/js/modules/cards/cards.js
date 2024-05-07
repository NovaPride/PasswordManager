import { ifCardGetCard, fCardRotate, fCardDefault, getLastAmountOfCards, setLastAmountOfCards} from '../../utils/utils';
import { localImageStartPath, deleteConfirmMessage } from '../../constants/constants';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { addToDB, updateInDB, removeFromDB } from '../../async/async';

let passwords = [];
let cardsIDs = {};
let isCardFullscreen = false;

function setImage(imgSrc, name, color, password){
  return `
    <div data-card-front class="card_front">` +
      (function(){
        if (imgSrc) {
          const isLocal = imgSrc.slice(0, 3) === "img" || imgSrc.slice(0, 3) === "svg";
          if(isLocal){
            return `<img data-card-front-img src="${localImageStartPath}${imgSrc}" alt="${name}" class="card_front_img">`;
          } else {
            return  `<img data-card-front-img src="${imgSrc}" alt="${name}" class="card_front_img">`;
          }
        } else return ``;
      }())
    + `</div>
    <div data-card-back class="card_back">` +
      (function(){
        if (name != "skeletLoad" && name != "newCard") {
          return `<div data-card-back-editor class="card_back_editor">
          <form data-card-back-form class="card_back_editor_form">
            <span>{<br></span>
            <div class="card_back_editor_form_element">
              <label for="name">ㅤ"name":</label>
              <input data-card-edit-textinput class="card_back_editor_form_element_textinput" type="text" id="name" name="name" value="${name}" spellcheck="false">
            </div>
            <div class="card_back_editor_form_element">
              <label for="imgSrc">ㅤ"imgSrc":</label>
              <input data-card-edit-textinput class="card_back_editor_form_element_textinput" type="text" id="imgSrc" name="imgSrc" value="${imgSrc}" spellcheck="false">
            </div>
            <div class="card_back_editor_form_element">
              <label for="color">ㅤ"color":</label>
              <input data-card-edit-textinput class="card_back_editor_form_element_textinput" type="text" id="color" name="color" value="${color}" spellcheck="false">
            </div>
            <div class="card_back_editor_form_element">
              <label for="password">ㅤ"password":</label>
              <input data-card-edit-textinput class="card_back_editor_form_element_textinput" type="text" id="password" name="password" value="${password}" spellcheck="false">
            </div>
            <span>}</span>
            <div class="card_back_editor_form_element">
              
              <button data-card-edit-submit class="card_back_editor_form_element_submit pushable" type="submit" id="submit" name="submit">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front">
                  Save
                </span>
              </button>
            </div>
          </form>
        </div>`
        } else return ``;
      }())
      +`</div>`;
};


export function addListenerToWrapper(db) {
  const wrapper = $("[data-wrapper]");
  const navbar = $("[data-navbar]");

  wrapper.addEventListener("click", async ({ target } = e) => {
    let card = ifCardGetCard(target);
    if (card) {
      const cardID = card.parentElement.dataset.card;
      const password = passwords[cardID]; //может пойти по пизде наверное
      if (password) {
        navigator.clipboard
          .writeText(password)
          .then(() => {
            const audio = new Audio("./src/sounds/copysound.mp3");
            audio.play();
          })
          .catch((err) => {
            //console.log('Something went wrong', err);//сюда можно ошибку
          });
      } else if (cardID === "newCard") {
        //сюда добавление новой карточки
        const newCard = {
          name: "test",
          imgSrc: "img/test.png",
          color: "#FFFFFF",
          password: "tespass",
        };
        await addToDB(newCard);
        location.reload();
      }
    }
  });

  function createPlaceholderCard(elementID) {
    const card = wrapper.querySelector(`[data-card="${elementID}"]`);
    const newCard = document.createElement("div");
    newCard.setAttribute("data-card", "placeholder");
    newCard.classList.add("card");
    card.insertAdjacentElement("afterend", newCard);
  }

  function onlyInteger(str) {
    const reg = /[0-9]/g;
    return str.match(reg).join("");
  }

  wrapper.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const cardFront = ifCardGetCard(e.target);
    if (cardFront) {
      //&& name != "newCard"
      const card = cardFront.parentElement;
      const dataID = card.dataset.card;

      if (dataID === "newCard") {
        return;
      }
      if (isCardFullscreen) {
        return;
      }
      card.removeEventListener("mousemove", fCardRotate);
      card.removeEventListener("mouseout", fCardDefault);
      card.style.transform = ``;
      card.style.transition = ``;

      createPlaceholderCard(dataID);

      const reg = /[0-9]/g;
      const [red, green, blue] = card.style.backgroundColor
        .split(",")
        .map((e) => onlyInteger(e));
      card.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.27)`;
      wrapper.classList.add("wrapper_swipe");
      card.classList.add("card_fullscreen");
      navbar.classList.add("hide");

      isCardFullscreen = true;

      // setTimeout(()=>{
      //   wrapper.classList.remove("wrapper_swipe");
      //   card.classList.remove("card_fullscreen");
      // }, 2000)
    }
  });

  wrapper.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("[data-card-edit-textinput]");
    const newCard = {};
    let emptyCount = 0;
    const cardID =
      e.target.parentElement.parentElement.parentElement.dataset.card; //bruh
    for (const { name, value } of Object.values(inputs)) {
      newCard[`${name}`] = value;
      if (!value) emptyCount++;
    }
    const cardsAmount = Object.keys(newCard).length;

    if (emptyCount === cardsAmount) {
      if (confirm(deleteConfirmMessage)) {
        await removeFromDB(newCard, cardsIDs[cardID]);
        location.reload(); //это снести нахуй наверное потом
      }
    } else {
      await updateInDB(newCard, cardsIDs[cardID]);
      location.reload(); //это снести нахуй наверное потом
    }
  });
}




function createCard ({id, name, imgSrc, color, password} = e, wrapper, index){
  const newCard = document.createElement("div");
  newCard.setAttribute("data-card", index);
  newCard.classList.add("card");
  newCard.style.cssText = `background:${color}`;
  if (name != "newCard"){
    //clog(id)
    newCard.addEventListener("mousemove", fCardRotate);//чужой
    newCard.addEventListener("mouseout", fCardDefault);//чужой
  }
  newCard.innerHTML = setImage(imgSrc, name, color, password);                                          
  wrapper.appendChild(newCard);
  passwords.push(password);//может пойти по пизде наверное
  cardsIDs[`${index}`] = id;
}

export function skeletLoad(){
  const wrapper = $("[data-wrapper]");
  wrapper.innerHTML = "";
  const cardsAmount = getLastAmountOfCards();
  for (let i = 0; i < cardsAmount; i++) {
    createCard({
      name: "skeletLoad",
      imgSrc: "",
      color: "rgba(235, 235, 235, 0.25)",
      password: "none"
    }, wrapper, "skeletLoad");
  }
  createCard(
    {
      name: "newCard",
      imgSrc: "svg/addNewCard.svg",
      color: "rgba(235, 235, 235, 0.25)",
      password: "none"
    },
    wrapper,
    "newCard"
  );
}


export function renderCards(db, search){
  const wrapper = $("[data-wrapper]");
  wrapper.innerHTML = "";
  passwords = [];
  let i = 0;
  for (const e of Object.values(db)) {
    if(search == "" || search == undefined || e.name.slice(0, search?.length) === search){ 
      createCard(e, wrapper, i++);
    } 
  }
  setLastAmountOfCards(i);
  createCard(
    {
      name: "newCard",
      imgSrc: "svg/addNewCard.svg",
      color: "rgba(235, 235, 235, 0.25)",
      password: "none"
    },
    wrapper,
    "newCard"
  );
};
  
 




