'use strict';

import header from './modules/header';
import cards from './modules/cards';
import cards_wrapper from './modules/cards_wrapper';

document.addEventListener("DOMContentLoaded", () => {
  header();
  cards();
  cards_wrapper();
});