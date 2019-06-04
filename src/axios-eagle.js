import axios from "axios";
// Security threat need to change it!!!
const API_KEY = "rySvqg7E2d3RuRuashJWDBshc7yJLKUgMr5yCGWU";

const instance = axios.create({
  baseURL: "https://api.eagle.io/api/v1/",
  headers: { "X-Api-key": API_KEY }
});

export default instance;
