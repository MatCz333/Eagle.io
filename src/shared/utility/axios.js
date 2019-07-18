import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.eagle.io/"
});

export default instance;
