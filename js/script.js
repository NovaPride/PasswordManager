'use strict';
document.addEventListener("DOMContentLoaded", e => {
  
  const tipadb = `{
    "telegram":{
      "imgSrc":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png",
      "color":"#ff00ff",
      "password":"mypass"
    },
    "google":{
      "imgSrc":"https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png",
      "color":"#ffff00",
      "password":"mypassgg"
    }
  }`;
  const tipadatabazaprishla = JSON.parse(tipadb);
  

  const wrapper = document.querySelector("[data-wrapper]");

  function renderCards(obj){
    for (const [key, e] of Object.entries(obj)) {
      const newCard = document.createElement("div");
      newCard.classList.add("wrapper_card");
      newCard.style.cssText = `background:${e?.color}`;
      newCard.innerHTML = `
        <img src="${e?.imgSrc}" alt="${key}" class="wrapper_card_img">
      `;
      console.log(e?.password)
      wrapper.appendChild(newCard);
    }
  }
  renderCards(tipadatabazaprishla);

});

