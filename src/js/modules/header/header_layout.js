import { root } from '../../selectors/selectors';

function header_layout(){
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container">
      <nav data-navbar class="navbar">
          <form data-searchbox class="searchbox" action="" >
            <input data-searchtext class="searchtext" name="searchtext" type="text" id="search_textbox" spellcheck="false" autocomplete="off">
          </form>
      </nav>
    </div>
  `;
  root.append(header);
}

export default header_layout;