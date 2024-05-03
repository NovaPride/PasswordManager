import { root } from '../../selectors/selectors';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { renderCards} from '../cards/cards';
import { localImageStartPath, dbAdress } from '../../constants/constants';

function addListenersToHeader(db) {
  const searchbox = $("[data-searchbox]"),
        searchtext = $("[data-searchtext]");

  const isActive = () => isHaveClass(searchbox, "searchbox_active");

  function closeIfScroll(target){
    function callback(){
      target.classList.remove("searchbox_active");
      searchtext.blur();
      window.removeEventListener("scroll", callback);
    }
    if (searchtext.value === "") {
      window.addEventListener("scroll", callback);
    }
  }

  searchbox.addEventListener("click", ({currentTarget}) => {
    const isEmpty = searchtext.value === "";
    if (isActive()) {
      if (isEmpty) {
        currentTarget.classList.remove("searchbox_active");
        searchtext.blur();
      }
    } else {
      currentTarget.classList.add("searchbox_active");
      closeIfScroll(currentTarget);
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