'use strict';

import header_layout from './modules/header/header_layout';
import cards_layout from './modules/cards/cards_layout';

import header from './modules/header/header';
//import cards from './modules/cards/cards';

// import { renderCards} from './modules/cards_wrapper';
// import { localImageStartPath } from './constants/constants';


document.addEventListener("DOMContentLoaded", () => {
  header_layout();
  cards_layout();
  header();
  //cards();
});