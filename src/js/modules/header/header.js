import { root } from '../../selectors/selectors';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { renderCards} from '../cards/cards';
import { localImageStartPath, dbAdress } from '../../constants/constants';

function addListenersToHeader(db) {
  const searchbox = $("[data-searchbox]"),
        searchtext = $("[data-searchtext]");

  const isActive = () => isHaveClass(searchbox, "searchbox_active");

  searchbox.addEventListener("click", ({currentTarget}) => {
    const isEmpty = searchtext.value === "";
    if (isActive()) {
      if (isEmpty) {
        currentTarget.classList.remove("searchbox_active");
        searchtext.blur();
      }
    } else {
      currentTarget.classList.add("searchbox_active");
    }
  });

  searchtext.addEventListener("keydown", e => {
    if(!isActive()){searchbox.classList.add("searchbox_active");}
  });

  searchtext.addEventListener("keyup", e => {
    if(isActive()){
      renderCards(db, localImageStartPath, e.currentTarget.value);
    }
  });
}

export default addListenersToHeader;