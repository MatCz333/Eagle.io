// animated svg icons
import svgPencilSpriteURL from "../assets/pencilIconSprite.svg";
import mapIconSpriteURL from "../assets/mapIconSprite.svg";
import historyIconSpriteURL from "../assets/historyIconSprite.svg";
import uploadIconSpriteURL from "../assets/uploadIconSprite.svg";
// drawer icons
import {
  SearchSensorIcon,
  FileUploadIcon,
  PencilIcon,
  HistoryIcon
} from "./drawerIcons";


/**
 * Constant that maps all possible paths with the choice's name
 *  */
 const CHOICES = {
    DATA_INPUT: {
      path: "/input",
      label: "DATA INPUT",
      spriteURL: svgPencilSpriteURL,
      drawerIcon: PencilIcon
    },
    UPLOAD_CSV: {
      path: "/uploadCSV",
      label: "UPLOAD CSV",
      spriteURL: uploadIconSpriteURL,
      drawerIcon: FileUploadIcon
    },
    FIND_SENSOR: {
      path: "/sensorFinder",
      label: "FIND SENSOR",
      spriteURL: mapIconSpriteURL,
      drawerIcon: SearchSensorIcon
    },
    HISTORY: {
      path: "/history",
      label: "HISTORY",
      spriteURL: historyIconSpriteURL,
      drawerIcon: HistoryIcon
    }
  };
  
  export default CHOICES;