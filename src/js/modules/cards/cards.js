import { ifCardGetCard, fCardRotate, fCardDefault} from '../../utils/utils';
import { localImageStartPath } from '../../constants/constants';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { addToDB } from '../../async/async';

let passwords = [];
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
        }
      }())
    + `</div>
    <div data-card-back class="card_back">
      <div data-card-back-editor class="card_back_editor">
        <form data-card-back-form class="card_back_editor_form">
          {<br>
            ㅤ"name": "${name}",<br>
            ㅤ"imgSrc": "${imgSrc}",<br>
            ㅤ"color": "${color}",<br>
            ㅤ"password": "${password}"<br>
          }
        </form>
      </div>
    </div>
  `;
};
  // "name": "facebook",
    // "imgSrc": "svg/facebook.svg",
    // "color": "#2074F4",
    // "password": "facebookpass"


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

  function createPlaceholderCard(elementID){
    const card =  wrapper.querySelector(`[data-card="${elementID}"]`);
    const newCard = document.createElement("div");
    newCard.setAttribute("data-card", "placeholder");
    newCard.classList.add("card");
    card.insertAdjacentElement("afterend", newCard);

  }

  function onlyInteger(str){
    const reg = /[0-9]/g;
    return str.match(reg).join('');
  }

  wrapper.addEventListener("contextmenu", e => {
    e.preventDefault();
    const cardFront = ifCardGetCard(e.target);
    if(cardFront ){//&& name != "newCard"
      const card = cardFront.parentElement;
      const dataID = card.dataset.card;
      
      if(dataID === "newCard"){return;}
      if(isCardFullscreen){return;}
      card.removeEventListener("mousemove", fCardRotate);
      card.removeEventListener("mouseout", fCardDefault);
      card.style.transform = ``;
      card.style.transition = ``;
      
      createPlaceholderCard(dataID);

      const reg = /[0-9]/g;
      const [red, green, blue] = card.style.backgroundColor.split(',').map(e => onlyInteger(e));
      card.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, 0.27)`;
      wrapper.classList.add("wrapper_swipe");
      card.classList.add("card_fullscreen");

      isCardFullscreen = true;
      // setTimeout(()=>{
      //   wrapper.classList.remove("wrapper_swipe");
      //   card.classList.remove("card_fullscreen");
      // }, 5000)
    }
  })
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
  newCard.classList.add("card");
  newCard.style.cssText = `background:${color}`;
  if (name != "newCard"){
    newCard.addEventListener("mousemove", fCardRotate);//чужой
    newCard.addEventListener("mouseout", fCardDefault);//чужой
  }
  newCard.innerHTML = setImage(imgSrc, name, color, password);                                          
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
  
 




