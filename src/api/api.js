import axios from "axios";

let BASE = "http://localhost:8000/api";

// console.log(process.env.NODE_ENV)
// if(process.env.NODE_ENV === 'production') {
//   BASE = 'https://kyc-api-saudi.herokuapp.com/api'
// }

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