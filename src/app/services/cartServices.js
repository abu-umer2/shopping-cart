import axios from "axios";
import dbserver from "../dbserver";

const token = sessionStorage.getItem("userAuth");
const CartServices = {
  getCart() {
    console.log("tt", token);

    return axios.get(`http://${dbserver.server}:${dbserver.port}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addItemToCart(productInfo) {
    const payload = {
      productId: productInfo._id,
      quantity: 1,
    };
    console.log("payload", payload);
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/cart/items`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default CartServices;
