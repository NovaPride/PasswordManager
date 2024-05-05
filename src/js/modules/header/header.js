import { $, isHaveClass, clog, cdir } from '../../utils/utils';
import { renderCards} from '../cards/cards';

function addListenersToHeader(db) {
  const searchbox = $("[data-searchbox]"),
        searchtext = $("[data-searchtext]");

  const headerTimer = {
    start : function () {
      this.timer = setTimeout(() => {
        closeSearchbar();
      }, 3000);
    },
    stop : function () {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  const isActive = () => isHaveClass(searchbox, "searchbox_active");

  const isEmpty = () => searchtext.value === "";

  function openSearchbar(){
    searchbox.classList.add("searchbox_active");
  }

  function closeSearchbar(){
    searchbox.classList.remove("searchbox_active");
    searchtext.value = "";
    searchtext.blur();
    renderCards(db, "");
  }

  function closeIfScroll() {
    function callback() {
      if (isEmpty()) {
        headerTimer.stop();
        closeSearchbar();
        window.removeEventListener("scroll", callback);
      }
    }
    window.addEventListener("scroll", callback);
  }

  searchbox.addEventListener("focusin", () => headerTimer.stop());

  searchbox.addEventListener("focusout", () => {
    if (isEmpty()) headerTimer.start()
  });

  searchtext.addEventListener("keydown", () => {
    if (!isActive()) openSearchbar();
  });

  searchtext.addEventListener("keyup", ({currentTarget}) => {
    if (isActive()) renderCards(db, currentTarget.value);
  });

  searchbox.addEventListener("click", () => {
    if (isActive() && isEmpty()) {
      closeSearchbar();
    } else {
      openSearchbar();
      closeIfScroll();
    }
  });
}

export default addListenersToHeader;