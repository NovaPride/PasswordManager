import { root } from '../../selectors/selectors';

export function background_layout(){
  const background = document.createElement("div");
  background.classList.add("background");
  root.append(background);
}