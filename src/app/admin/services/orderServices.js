import dbserver from "../../dbserver";
import axios from "axios";

const OrdersServices = {
  getAllOrders() {
    return axios.get(`http://${dbserver.server}:${dbserver.port}/orders`);
  },
};

export default OrdersServices;
