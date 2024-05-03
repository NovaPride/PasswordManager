import { root } from '../../selectors/selectors';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { renderCards} from '../cards/cards';
import { localImageStartPath, dbAdress } from '../../constants/constants';

function addListenersToHeader(db) {
  const searchbox = $("[data-searchbox]"),
        searchtext = $("[data-searchtext]");

  const isActive = () => isHaveClass(searchbox, "searchbox_active");

  // function updateTimer(target, timer) {
  //   if (timer){
  //     clear
  //   } else {
  //     return setTimeout(() => {
  //       if (searchtext.value === ""){
  //         target.classList.remove("searchbox_active");
  //         searchtext.blur();
  //       }
  //     }, 3000);
  //   }
  // }

  searchbox.addEventListener("click", ({currentTarget}) => {
    const isEmpty = searchtext.value === "";
    // const interval = setInterval(() => {
    //   if (searchtext.value === ""){
    //     currentTarget.classList.remove("searchbox_active");
    //     searchtext.blur();
    //     clearInterval(interval);
    //   }
    // }, 3000);
    if (isActive()) {
      if (isEmpty) {
        currentTarget.classList.remove("searchbox_active");
        searchtext.blur();
        //clearInterval(interval);
      }
    } else {
      currentTarget.classList.add("searchbox_active");
      
      //clearInterval(interval);
      //clog(interval);
      // const nig = updateTimer(currentTarget);
      // updateTimer(currentTarget, nig);
    }
  });

  searchtext.addEventListener("keydown", e => {
    if(!isActive()){searchbox.classList.add("searchbox_active");}
  });

  searchtext.addEventListener("keyup", e => {
    if(isActive()){
      renderCards(db, e.currentTarget.value);
    }
  });
}

export default addListenersToHeader;