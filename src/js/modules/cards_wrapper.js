import { ifCardGetCard, fCardRotate, fCardDefault} from '../utils/utils';
import { localImageStartPath } from '../constants/constants';
import { $, isHaveClass, clog, cdir } from '../utils/utils';
//function cards_wrapper(db){
  
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

  let initializationWrapper = true;

  function addListenerToWrapper(){
    if(initializationWrapper){
      const wrapper = document.querySelector("[data-wrapper]");
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
      initializationWrapper = false;
    }
  }
  
  
  export function renderCards(obj, imgPath, search){
    const wrapper = document.querySelector("[data-wrapper]");
    wrapper.innerHTML = "";
    passwords = [];
    let i = 0;
    for (const [key, {svg, imgSrc, local, color, password} = e] of Object.entries(obj)) {
      if(search == "" || search == undefined || key.slice(0, search?.length) === search){ 
        const newCard = document.createElement("div");
        newCard.setAttribute("data-card", i++);
        newCard.classList.add("wrapper_card");
        newCard.style.cssText = `background:${color}`;
        newCard.addEventListener("mousemove", fCardRotate);//чужой
        newCard.addEventListener("mouseout", fCardDefault);//чужой
        newCard.innerHTML = setImage(imgPath, svg, imgSrc, local, key);                                          
        wrapper.appendChild(newCard);
        passwords.push(password);//может пойти по пизде наверное
      } 
     }
     addListenerToWrapper();
  };
  
 

  //renderCards(db, localImageStartPath);
//}




//export default cards_wrapper;