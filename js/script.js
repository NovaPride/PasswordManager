'use strict';
document.addEventListener("DOMContentLoaded", e => {
  
  const tipadb = `{
    "telegram":{
      "svg":"./icons/svg/telegram.svg",
      "local":"true",
      "color":"#3d92ba",
      "password":"mypass"
    },
    "google":{
      "svg":"./icons/svg/google.svg",
      "local":"true",
      "color":"#fefffe",
      "password":"mypassgg"
    }
  }`;
  const tipadatabazaprishla = JSON.parse(tipadb);
  

  const wrapper = document.querySelector("[data-wrapper]");

  function setImage(svg, imgSrc, local, key){
    if (imgSrc) {
      return `
        <div class="wrapper_card_front">
          <img src="${imgSrc}" alt="${key}" class="wrapper_card_front_img">
        </div>
        <div class="wrapper_card_back">
        </div>
      `;
    } else if (svg && local === "true"){
      return  `
        <div class="wrapper_card_front">
          <img src="${svg}" alt="${key}" class="wrapper_card_front_img">
        </div>
        <div class="wrapper_card_back"> 
        </div>
      `;
    } else if (svg && local === "false"){
      return `
        <div class="wrapper_card_front">
          <div class="wrapper_card_front_svg"> ${svg} </div>
        </div>
        <div class="wrapper_card_back">
        </div>
      `;
    }
  }

  function renderCards(obj){
    for (const [key, {svg, imgSrc, local, color, password} = e] of Object.entries(obj)) {

      const newCard = document.createElement("div");
      newCard.classList.add("wrapper_card");
      newCard.style.cssText = `background:${color}`;
      
      newCard.innerHTML = setImage(svg, imgSrc, local, key);
      //переделать под фронт и бэк отдельно неаверное
      newCard.addEventListener("mousemove", fCardRotate);//чужой
      newCard.addEventListener("mouseout", fCardDefault);//чужой
      //console.log(password)
      wrapper.appendChild(newCard);
    }
  }
  //чужой
  function fCardRotate(ev) {
    this.style.transform = `scale(1.1) perspective(1000px) rotatey(${(ev.offsetX - this.offsetWidth / 2) / 6}deg) rotatex(${((ev.offsetY - this.offsetHeight / 2) / 6) * -1}deg)`;
  }
  function fCardDefault() {
    this.style.transform = ``;
  }

  renderCards(tipadatabazaprishla);

});

