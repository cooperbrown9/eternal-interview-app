import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

let BASE = "http://localhost:8000/api";

// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'production') {
  BASE = process.env.REACT_APP_API;
}

const http = axios.create({ withCredentials: true, baseURL: BASE });

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export { http, serialize };