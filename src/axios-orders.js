import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-man-project.firebaseio.com/"
});

export default instance;
