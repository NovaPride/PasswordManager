import { dbAdress } from "../constants/constants";
import { clog } from "../utils/utils";

export async function getDB(){
  //await new Promise(resolve => setTimeout(resolve, 1000));
  return fetch(dbAdress)
    .then(data => data.json());
}

export async function addToDB(card){//обработку http ошибок сделать
  //await new Promise(resolve => setTimeout(resolve, 1000));
  fetch(dbAdress, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(card)
    
  });

}