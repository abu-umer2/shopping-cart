// import dbserver from "../../dbserver";
// import axios from "axios";
// export default {
//   CheckLogin(username, password) {
//     var payload = { username, password };
//     console.log(payload);
//     return axios.post(
//       `http://${dbserver.server}:${dbserver.port}/auth/login`,
//       payload
//     );
//   },
// };
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;
