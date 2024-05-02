import { ifCardGetCard, fCardRotate, fCardDefault} from '../../utils/utils';
import { localImageStartPath } from '../../constants/constants';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';

let passwords = [];

function setImage(path, svg, imgSrc, local, key){
  return `
    <div data-card-front class="wrapper_card_front">` +
      (function(){
        if (imgSrc) {
          return `<img data-card-front-img src="${path}${imgSrc}" alt="${key}" class="wrapper_card_front_img">`;
        } else if (svg && local === "true"){
          return  `<img data-card-front-img src="${path}${svg}" alt="${key}" class="wrapper_card_front_img">`;
        } else if (svg && local === "false"){
          return `<div data-card-front-svg class="wrapper_card_front_svg"> ${svg} </div>`;
        }
      }())
    + `</div>
    <div data-card-back class="wrapper_card_back">
    </div>
  `;
};

export function addListenerToWrapper(){
  const wrapper = $("[data-wrapper]");
  wrapper.addEventListener("click", ({target} = e) => {
    let card = ifCardGetCard(target);
    if (card) {
      const cardID = card.parentElement.dataset.card;
      const password = passwords[cardID];//может пойти по пизде наверное
      if (password) {
        navigator.clipboard.writeText(password)
          .then(() => {
            const audio = new Audio("./src/sounds/copysound.mp3");
            audio.play();
          })
          .catch(err => {
            //console.log('Something went wrong', err);//сюда можно ошибку
          })
      }
    }
  });
  
}

function createCard (key, {svg, imgSrc, local, color, password} = e, wrapper, imgPath, index){
  const newCard = document.createElement("div");
  newCard.setAttribute("data-card", index);
  newCard.classList.add("wrapper_card");
  newCard.style.cssText = `background:${color}`;
  if (key != "newCard"){
    newCard.addEventListener("mousemove", fCardRotate);//чужой
    newCard.addEventListener("mouseout", fCardDefault);//чужой
  }
  newCard.innerHTML = setImage(imgPath, svg, imgSrc, local, key);                                          
  wrapper.appendChild(newCard);
  passwords.push(password);//может пойти по пизде наверное
}


export function renderCards(obj, imgPath, search){
  const wrapper = $("[data-wrapper]");
  wrapper.innerHTML = "";
  passwords = [];
  let i = 0;
  for (const [key, e] of Object.entries(obj)) {
    if(search == "" || search == undefined || key.slice(0, search?.length) === search){ 
      createCard(key, e, wrapper, imgPath, i++);
    } 
  }
  createCard(
    "newCard", 
    {
      svg: "svg/addNewCard.svg",
      imgSrc: "svg/addNewCard.svg",
      local: "true",
      color: "rgba(235, 235, 235, 0.25)",
      password: "none"
    },
    wrapper,
    imgPath,
    "newCard"
  );
};
  
 




