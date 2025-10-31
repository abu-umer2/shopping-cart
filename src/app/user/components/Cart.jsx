import React, { useEffect, useState } from "react";
import CartServices from "../../services/cartServices";

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCart = async () => {
      const response = await CartServices.getCart();
      setCart(response.data);
      console.log("cart", cart);
    };

    getCart();
  }, []);
  return <div>{cart.createdAt}</div>;
};

export default Cart;
