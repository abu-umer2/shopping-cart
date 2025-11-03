import React, { useEffect, useState } from "react";
import CartServices from "../../services/cartServices";

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const getCart = async () => {
      const response = await CartServices.getCart();
      setCart(response.data);
      console.log("cart", response.data);
    };

    getCart();
  }, []);
  console.log("cart", cart);
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty.</p>;
  return (
    <div>
      {cart.items.map((item) => (
        <div key={item._id}>
          <h1>{item.productName}</h1>
        </div>
      ))}

      {/* <div>
        <div>
          <img src={item.} alt="" />
          <div><p></p>
          <p></p></div>
        </div>
      </div> */}
    </div>
  );
};

export default Cart;
