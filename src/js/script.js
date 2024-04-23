'use strict';
document.addEventListener("DOMContentLoaded", e => {
  //это остается тут
  const root = document.querySelector("body");
  
  //это выносится нахуй
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container"></div>
  `;

  //это тоже
  const main = document.createElement("section");
  main.classList.add("main");
  main.innerHTML = `
    <div class="container">
      <div data-wrapper class="wrapper">
          
      </div>
    </div>
  `;

  //это остается тут
  root.append(header);
  root.append(main);



  //выносится
  
  const wrapper = document.querySelector("[data-wrapper]");
  
  function setImage(path, svg, imgSrc, local, key){//эту хуйню зарефакторить надо
    if (imgSrc) {
      return `
        <div data-card-front class="wrapper_card_front">
          <img data-card-front-img src="${path}${imgSrc}" alt="${key}" class="wrapper_card_front_img">
        </div>
        <div data-card-back class="wrapper_card_back">
        </div>
      `;
    } else if (svg && local === "true"){
      return  `
        <div data-card-front class="wrapper_card_front">
          <img data-card-front-img src="${path}${svg}" alt="${key}" class="wrapper_card_front_img">
        </div>
        <div data-card-back class="wrapper_card_back"> 
        </div>
      `;
    } else if (svg && local === "false"){
      return `
        <div data-card-front class="wrapper_card_front">
          <div data-card-front-svg class="wrapper_card_front_svg"> ${svg} </div>
        </div>
        <div data-card-back class="wrapper_card_back">
        </div>
      `;
    }
  }
  
  //чужой
  function fCardRotate(e) {
    this.style.transform = `scale(1.1) perspective(1000px) rotatey(${(e.offsetX - this.offsetWidth / 2) / 6}deg) rotatex(${((e.offsetY - this.offsetHeight / 2) / 6) * -1}deg)`;
  }
  function fCardDefault() {
    this.style.transform = ``;
  }
  function fCardCopy(pass){

  }


  function renderCards(obj, imgPath){
    let i = 0;
    for (const [key, {svg, imgSrc, local, color, password} = e] of Object.entries(obj)) {

      const newCard = document.createElement("div");
      newCard.setAttribute("data-card", i++);
      newCard.classList.add("wrapper_card");
      newCard.style.cssText = `background:${color}`;
      newCard.addEventListener("mousemove", fCardRotate);//чужой
      newCard.addEventListener("mouseout", fCardDefault);//чужой
      newCard.addEventListener("click", () => {
        if (password) {
          navigator.clipboard.writeText(password)
            .then(() => {
              //console.log("Copied!")//сюда интеректвность, после копирования
            })
            .catch(err => {
              //console.log('Something went wrong', err);//сюда можно ошибку
            })
        }
      })
      newCard.innerHTML = setImage(imgPath, svg, imgSrc, local, key);                                          
      wrapper.appendChild(newCard);
    }
  }
  
  const localImageStartPath = "./src/icons/";
 // const passwords = [];//может пойти по пизде наверное
  fetch('http://localhost:3000/passwords')
    .then(data => data.json())
    .then(db => 
      renderCards(db, localImageStartPath)
      //for(const [key, {password} = e] of Object.entries(db)){passwords.push(password)}//может пойти по пизде наверное
    );

  // function ifCardGetCard(target){
  //   if (target.dataset.cardFrontImg == '') {
  //     return target.parentElement;
  //   } else if (target.dataset.cardFront  == '') {
  //     return target;
  //   }
  // }

  wrapper.addEventListener("click", ({target} = e) => {
    let card = ifCardGetCard(target);
    if (card) {
      const cardID = card.parentElement.dataset.card;
      const password = passwords[cardID];//может пойти по пизде наверное
      if (password) {
        navigator.clipboard.writeText(password)
          .then(() => {
            //console.log("Copied!")//сюда интеректвность, после копирования
          })
          .catch(err => {
            //console.log('Something went wrong', err);//сюда можно ошибку
          })
      }
    }
  })

  // wrapper.addEventListener("mousemove", e => {
  //   const allCards = e.currentTarget.querySelectorAll("[data-card]");
  //   allCards.forEach(e => {
  //     e.style.transform = ``;
  //   });
  //   let card = ifCardGetCard(e.target);
  //   if (card) {
  //     card.parentElement.style.transform = `scale(1.1) perspective(1000px) rotatey(${(e.offsetX - card.parentElement.offsetWidth / 2) / 6}deg) rotatex(${((e.offsetY - card.parentElement.offsetHeight / 2) / 6) * -1}deg)`;
  //   }   
  // })
  
});

