import axios from "axios";
import dbserver from "../dbserver";

const getToken = () => {
  try {
    const userData = sessionStorage.getItem("userAuth");
    return userData;
  } catch (error) {
    return null;
  }
};

const CartServices = {
  getCart() {
    const token = getToken();
    console.log("tt", token);

    return axios.get(`http://${dbserver.server}:${dbserver.port}/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addItemToCart(productInfo) {
    const token = getToken();
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
