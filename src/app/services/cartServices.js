import axios from "axios";
import dbserver from "../dbserver";

const token = sessionStorage.getItem("userAuth");

const CartServices = {
  getCart() {
    return axios.get(`http://${dbserver.server}:${dbserver.port}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addItemToCart(productInfo) {
    const payload = {
      productId: productInfo._id,
      quantity: 1,
    };
    return axios.post(
      `http://${dbserver.server}:${dbserver.port}/cart/items`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default CartServices;
