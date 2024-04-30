'use strict';

import { clog } from './utils/utils';
import { localImageStartPath } from './constants/constants';

import header_layout from './modules/header/header_layout';
import cards_layout from './modules/cards/cards_layout';

import { getDB } from './async/async';

import { renderCards, addListenerToWrapper } from './modules/cards/cards';
import addListenersToHeader from './modules/header/header';


document.addEventListener("DOMContentLoaded", async () => {
  header_layout();
  cards_layout();
  
  const db = await getDB();
  renderCards(db, localImageStartPath);
  addListenerToWrapper();
  addListenersToHeader(db);
});