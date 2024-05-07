import { root } from '../../selectors/selectors';

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