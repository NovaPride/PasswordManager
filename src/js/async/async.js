import { dbAdress } from "../constants/constants";
import { clog } from "../utils/utils";

export function fetchDB(){
  return fetch(dbAdress)
    .then(data => data.json());
}