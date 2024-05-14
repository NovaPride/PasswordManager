import { ifCardGetCard, fCardRotate, fCardDefault, getLastAmountOfCards, setLastAmountOfCards} from '../../utils/utils';
import { deleteConfirmMessage } from '../../constants/constants';
import { $, onlyInteger, isName, isColor, isPassword} from '../../utils/utils';
import { addToDB, updateInDB, removeFromDB } from '../../async/async';
import { setImage } from './cards_layout';

let passwords = [];
let cardsIDs = {};
let isCardFullscreen = false;

function createCard ({id, name, imgSrc, color, password} = e, wrapper, index){
  const newCard = document.createElement("div");
  newCard.setAttribute("data-card", index);
  newCard.classList.add("card");
  newCard.style.cssText = `background:${color}`;
  if (name != "newCard"){
    newCard.addEventListener("mousemove", fCardRotate);
    newCard.addEventListener("mouseout", fCardDefault);
  }
  newCard.innerHTML = setImage(imgSrc, name, color, password);                                          
  wrapper.appendChild(newCard);
  passwords.push(password);
  cardsIDs[`${index}`] = id;
}

export function addListenersToWrapper() {
  const wrapper = $("[data-wrapper]");
  const navbar = $("[data-navbar]");

  function createPlaceholderCard(elementID) {
    const card = wrapper.querySelector(`[data-card="${elementID}"]`);
    const newCard = document.createElement("div");
    newCard.setAttribute("data-card", "placeholder");
    newCard.classList.add("card");
    card.insertAdjacentElement("afterend", newCard);
  }

  wrapper.addEventListener("click", async ({ target } = e) => {
    let card = ifCardGetCard(target);
    if (card) {
      const cardID = card.parentElement.dataset.card;
      const password = passwords[cardID];
      if (password) {
        navigator.clipboard
          .writeText(password)
          .then(() => {
            const audio = new Audio("./src/sounds/copysound.mp3");
            audio.play();
          })
          .catch((err) => {
            console.log('Something went wrong', err);
          });
      } else if (cardID === "newCard") {
        const newCard = {
          name: "test",
          imgSrc: "img/test.png",
          color: "#FFFFFF",
          password: "tespass",
        };
        root.classList.add("wait");
        await addToDB(newCard);
        root.classList.remove("wait");
        location.reload();
      }
    } else if (target.dataset.cardBackRandom == '') {
      target.innerText = "";
      const chars = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      const passwordTextBox = target.parentElement.querySelector("#password");
      const indexOfFistInsert = passwordTextBox.value.indexOf("%");
      const indexOfSecondInsert = passwordTextBox.value.indexOf("%", indexOfFistInsert+1);
      
      for (let i = 0; i < 10; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        target.innerText += chars.substring(randomNumber, randomNumber +1);
      }
     
      if(indexOfFistInsert != -1 && indexOfSecondInsert != -1){
        passwordTextBox.value = `${passwordTextBox.value.slice(0, indexOfFistInsert)}%${target.innerText}%`;
      }
    }
  });

  wrapper.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const cardFront = ifCardGetCard(e.target);
    if (cardFront) {
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

      const [red, green, blue] = card.style.backgroundColor
        .split(",")
        .map((e) => onlyInteger(e));
      card.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.27)`;
      wrapper.classList.add("wrapper_swipe");
      card.classList.add("card_fullscreen");
      navbar.classList.add("hide");

      isCardFullscreen = true;
    }
  });

  wrapper.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("[data-card-edit-textinput]");
    const newCard = {};
    let emptyCount = 0;
    const cardID =
      e.target.parentElement.parentElement.parentElement.dataset.card;
    for (const { name, value } of Object.values(inputs)) {
      
      newCard[`${name}`] = value;
      if (!value) emptyCount++;
    }
    const cardsAmount = Object.keys(newCard).length;

   
    if (emptyCount === cardsAmount) {
      if (confirm(deleteConfirmMessage)) {
        root.classList.add("wait");
        await removeFromDB(newCard, cardsIDs[cardID]);
        root.classList.remove("wait");
        location.reload(); 
      }
    } 

    for (const { name, value } of Object.values(inputs)) {
      switch (name){
        case "name": {
          if(!isName(value)){
            console.error("Wrong name!");
            return;
          }
          break;
        }
        case "color": {
          if(!isColor(value)){
            console.error("Not a hex color!");
            return;
          }
          break;
        }
        case "password": {
          if(!isPassword(value)){
            console.error("Password used forbidden symbols!");
            return;
          }
          break;
        }
        default: break;
      }
    }
    
    root.classList.add("wait");
    await updateInDB(newCard, cardsIDs[cardID]);
    root.classList.remove("wait");
    location.reload(); 
  });
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
  
 




