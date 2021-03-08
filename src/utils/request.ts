import axios from "axios";
import router from "@/router";

const request = axios.create({
  baseURL: "http://zinchon.com:337"
});

export default request;
