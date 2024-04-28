import { root } from '../selectors/selectors';
import { $, isHaveClass, clog, cdir } from '../utils/utils'


function header() {
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container">
      <nav class="navbar">
          <form data-searchbox class="searchbox" action="" >
            <input data-searchtext class="searchtext" type="text" id="search_textbox" spellcheck="false" autocomplete="off">
          </form>
      </nav>
    </div>
  `;
  root.append(header);
  
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

  // search.addEventListener("keyup", e => {
    
  //   const isActive = isHaveClass(e.currentTarget, "search_active"),
  //         isEmpty = e.currentTarget.value === "";
  //   if(isActive){clog(e.currentTarget.value)}

  // });
}

export default header;