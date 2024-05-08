'use strict';

import { clog } from './utils/utils';
import { localImageStartPath } from './constants/constants';

import { background_layout } from './modules/background/background_layout';
import { header_layout } from './modules/header/header_layout';
import { cards_layout } from './modules/cards/cards_layout';

import { backgroundChangeColor } from './modules/background/background';

import { getDB, addToDB } from './async/async';

import { skeletLoad, renderCards, addListenerToWrapper } from './modules/cards/cards';
import addListenersToHeader from './modules/header/header';


document.addEventListener("DOMContentLoaded", async e => {
  e.preventDefault();
  
  background_layout();
  header_layout();
  cards_layout();

  backgroundChangeColor();
  skeletLoad();
  
  const db = await getDB();
  renderCards(db);

  addListenerToWrapper(db);
  addListenersToHeader(db);
});