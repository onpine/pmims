import axios from "axios";
import router from "@/router";

const request = axios.create({
  baseURL: "http://192.168.233.218:6287/"
});

export default request;
