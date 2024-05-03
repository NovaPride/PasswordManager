import { dbAdress } from "../constants/constants";
import { clog } from "../utils/utils";

export async function getDB(){
  //await new Promise(resolve => setTimeout(resolve, 1000));
  return fetch(dbAdress)
    .then(data => data.json());
}

export async function addToDB(){//обработку http ошибок сделать
  await new Promise(resolve => setTimeout(resolve, 1000));
  fetch("http://localhost:3000/post", {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
        "redssit":{
          "svg":"svg/reddit.svg",
          "local":"true",
          "color":"#FF4500",
          "password":"redditpass"
        }
    })
    
  });

}