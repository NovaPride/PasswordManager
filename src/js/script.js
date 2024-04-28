'use strict';

import header from './modules/header';
import cards from './modules/cards';
// import { renderCards} from './modules/cards_wrapper';
// import { localImageStartPath } from './constants/constants';


document.addEventListener("DOMContentLoaded", () => {
  header();
  cards();
});