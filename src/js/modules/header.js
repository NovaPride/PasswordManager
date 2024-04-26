import { root } from '../selectors/selectors';
import { $, clog, cdir } from '../utils/utils'


function header() {
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container">
      <nav class="navbar">
        <div data-search class="search">
          
        </div>
      </nav>
    </div>
  `;
  root.append(header);
  
  const search = $("[data-search]");
  search.addEventListener("click", ({currentTarget}) => {
    currentTarget.classList.toggle("search_active");
  });
}

export default header;