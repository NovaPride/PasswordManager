'use strict';

import { clog } from './utils/utils';
import { localImageStartPath } from './constants/constants';

import { bodyHeightChanger } from './responsive/responsive';
import header_layout from './modules/header/header_layout';
import cards_layout from './modules/cards/cards_layout';

import { getDB, addToDB } from './async/async';

import { renderCards, addListenerToWrapper } from './modules/cards/cards';
import addListenersToHeader from './modules/header/header';

document.addEventListener("DOMContentLoaded", async e => {
  e.preventDefault();
  
  header_layout();
  cards_layout();
  
  const db = await getDB();

  renderCards(db);
  bodyHeightChanger();//это после skelet load должна быть а не тут
  addListenerToWrapper(db);
  addListenersToHeader(db);
  
});