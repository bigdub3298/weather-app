import axios from "axios";

export default axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast"
});
