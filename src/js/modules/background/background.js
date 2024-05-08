import { clog } from "../../utils/utils";

export function backgroundChangeColor(){
  const currHour = new Date().getHours();
  document.documentElement.style.cssText = 
  `--background-image-color: linear-gradient` +
  (function(){
    if (currHour >= 0 && currHour < 6){
      return "(330deg, #4c2a43 0%, #141526 74%)";
    } else if (currHour >= 6 && currHour < 12){
      return "(330deg, #8676e2 0%, #f2b0b0 74%)";
    } else if (currHour >= 12 && currHour < 18){
      return "(330deg, #654853 0%, #e6ce94 74%)";
    } else if (currHour >= 18 && currHour < 24){
      return "(330deg, #7f5a83 0%, #0d324d 74%)";
    } else {
      console.error("Current system hour is not in 0-24 range.\n  Are you living on Earth?");
      return "(330deg, #7f5a83 0%, #0d324d 74%)";
    }
  }()); 
}