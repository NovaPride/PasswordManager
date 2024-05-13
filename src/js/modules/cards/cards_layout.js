import { root } from '../../selectors/selectors';
import { localImageStartPath } from '../../constants/constants';

export function cards_layout(){
  const cards = document.createElement("section");
  cards.classList.add("cards");
  cards.innerHTML = `
    <div class="container">
      <div data-wrapper class="wrapper">
          
      </div>
    </div>
  `;
  root.append(cards);
}

export function setImage(imgSrc, name, color, password){
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
          <div data-card-back-random class="card_back_editor_random">
            Click me
          </div>
        </div>`
        } else return ``;
      }())
      +`</div>`;
};