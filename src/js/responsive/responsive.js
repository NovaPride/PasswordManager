import { root } from "../selectors/selectors";


const isScrollbar = () => document.documentElement.scrollHeight > document.documentElement.clientHeight;

function changeToMobile(){
  isScrollbar() ? 
    root.classList.add("mobile") : 
    root.classList.remove("mobile");
}

export function manualHeightChange(){
  changeToMobile();
}

export function bodyHeightChanger(){
  changeToMobile();
  window.addEventListener("resize", () => changeToMobile());
}

