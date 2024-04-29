import { root } from '../../selectors/selectors';
import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { renderCards} from '../cards/cards';
import { localImageStartPath } from '../../constants/constants';

function header() {
  const searchbox = $("[data-searchbox]"),
        searchtext = $("[data-searchtext]");

  searchbox.addEventListener("click", ({currentTarget}) => {
    const isActive = isHaveClass(currentTarget, "searchbox_active"),
          isEmpty = searchtext.value === "";
    if (isActive) {
      if (isEmpty) {
        currentTarget.classList.remove("searchbox_active");
        searchtext.blur();
      }
    } else {
      currentTarget.classList.add("searchbox_active");
    }
  });

  searchtext.addEventListener("keydown", e => {
    const isActive = isHaveClass(searchbox, "searchbox_active");
    if(!isActive){searchbox.classList.add("searchbox_active");}
  });

 

  fetch('http://localhost:3000/passwords')
    .then(data => data.json())
    .then(db => {
      renderCards(db, localImageStartPath);
      searchtext.addEventListener("keyup", e => {
        const isActive = isHaveClass(searchbox, "searchbox_active");
        if(isActive){
          renderCards(db, localImageStartPath, e.currentTarget.value);
        }
      });
    }
  );
}

export default header;