import { root } from '../selectors/selectors';

function header() {
  const header = document.createElement("header");
  header.innerHTML = `
    <div class="container"></div>
  `;
  root.append(header);
}

export default header;