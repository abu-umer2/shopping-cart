import dbserver from "../../dbserver";
import axios from "axios";
export default {
  CheckLogin(username, password) {
    var payload = { username, password };
    console.log(payload);
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/auth/login`,
      payload
    );
  },
};
