import { root } from '../selectors/selectors';

function cards(){
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

export default cards;