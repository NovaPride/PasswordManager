import { dbAdress } from "../constants/constants";
import { clog } from "../utils/utils";

export async function getDB(){
  //await new Promise(resolve => setTimeout(resolve, 1000));
  return fetch(dbAdress)
    .then(data => data.json())
    .then(db => db);
}