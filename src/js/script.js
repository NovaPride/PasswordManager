'use strict';

import { background_layout } from './modules/background/background_layout';
import { header_layout } from './modules/header/header_layout';
import { cards_layout } from './modules/cards/cards_layout';

import { backgroundChangeColor } from './modules/background/background';

import { getDB } from './async/async';

import { skeletLoad, renderCards, addListenersToWrapper } from './modules/cards/cards';
import { addListenersToHeader } from './modules/header/header';


document.addEventListener("DOMContentLoaded", async e => {
  e.preventDefault();
  
  background_layout();
  header_layout();
  cards_layout();

  backgroundChangeColor();
  skeletLoad();
  
  const db = await getDB();
  renderCards(db);

  addListenersToWrapper();
  addListenersToHeader(db);
});