import axios from "axios";

export default axios.create({
  baseURL:
    " https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast"
});
