import { dbAdress } from "../constants/constants";
import { getRandomIntInclusive} from "../utils/utils";
import { setLastAmountOfCards, getLastAmountOfCards } from "../utils/utils";
import { debugDelayMode } from "../constants/constants";

function debugDelay() {
  if (debugDelayMode) {
    return new Promise(resolve => setTimeout(resolve, getRandomIntInclusive(1000, 5000)));
  }
}

export async function getDB() {
  await debugDelay();
  return fetch(dbAdress)
    .then(data => data.json());
}

export async function addToDB(card) {
  await debugDelay();
  fetch(dbAdress, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
  });
  setLastAmountOfCards(+getLastAmountOfCards() + 1);
}

export async function updateInDB(card, id) {
  await debugDelay();
  fetch(`${dbAdress}/${id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
  });
}

export async function removeFromDB(card, id) {
  await debugDelay();
  fetch(`${dbAdress}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
  });
  setLastAmountOfCards(+getLastAmountOfCards() - 1);
}