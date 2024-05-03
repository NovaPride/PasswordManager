import { ifCardGetCard, fCardRotate, fCardDefault} from '../../utils/utils';
import { localImageStartPath } from '../../constants/constants';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { addToDB } from '../../async/async';

let passwords = [];

function setImage(imgSrc, name){
  
  return `
    <div data-card-front class="wrapper_card_front">` +
      (function(){
        if (imgSrc) {
          const isLocal = imgSrc.slice(0, 3) === "img" || imgSrc.slice(0, 3) === "svg";
          if(isLocal){
            return `<img data-card-front-img src="${localImageStartPath}${imgSrc}" alt="${name}" class="wrapper_card_front_img">`;
          } else {
            return  `<img data-card-front-img src="${imgSrc}" alt="${name}" class="wrapper_card_front_img">`;
          }
        }
      }())
    + `</div>
    <div data-card-back class="wrapper_card_back">
    </div>
  `;
};



export function addListenerToWrapper(db){
  const wrapper = $("[data-wrapper]");

  wrapper.addEventListener("click", async ({target} = e) => {
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
      } else if (cardID === "newCard") {
        //сюда добавление новой карточки
        const newCard = {
          "name": "test",
          "imgSrc": "img/test.png",
          "color": "#FFFFFF",
          "password": "tespass"
        };
        await addToDB(newCard);
        location.reload();
      }
    }
  });
  // wrapper.addEventListener("contextmenu", e => {
  //   e.preventDefault();
  // })
  // wrapper.addEventListener("mousedown", downEvent => {
  //   downEvent.preventDefault();
  //   const cardFront = ifCardGetCard(downEvent.target);
  //   //card.style.display = `none`;
  //   if(cardFront){
  //     const card = cardFront.parentElement;
  //     clog(downEvent);
  //     card.removeEventListener("mousemove", fCardRotate);
  //     card.removeEventListener("mouseout", fCardDefault);
  //     card.style.transform = 
  //     `scale(1) perspective(1000px)`;
  //     wrapper.addEventListener("mousemove", moveEvent => {
  //       clog("pizdec")
  //     });
  //   }
    
  // })
}

function createCard ({name, imgSrc, color, password} = e, wrapper, index){
  const newCard = document.createElement("div");
  newCard.setAttribute("data-card", index);
  newCard.classList.add("wrapper_card");
  newCard.style.cssText = `background:${color}`;
  if (name != "newCard"){
    newCard.addEventListener("mousemove", fCardRotate);//чужой
    newCard.addEventListener("mouseout", fCardDefault);//чужой
  }
  newCard.innerHTML = setImage(imgSrc, name);                                          
  wrapper.appendChild(newCard);
  passwords.push(password);//может пойти по пизде наверное
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
  
 




