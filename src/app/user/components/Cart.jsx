import React, { useEffect, useState } from "react";
import CartServices from "../../services/cartServices";
import Button from "../../shared/controls/Button";
import { useDispatch } from "react-redux";
import { deleteItem, emptyCart } from "../data/cartSlice";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCart = async () => {
      const response = await CartServices.getCart();
      setCart(response.data);
      console.log("cart", response.data.items);
    };

    getCart();
  }, []);
  const removeItemFromCart = async (productId) => {
    try {
      console.log("Deleting product ID:", productId);

      await CartServices.deleteItemsfromCart(productId);
      dispatch(deleteItem(productId));
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
    }
  };
  const clearCart = async (productId) => {
    try {
      console.log("Deleting product ID:", productId);

      await CartServices.clearCart();
      dispatch(emptyCart());
    } catch (error) {
      console.error(
        "Error removing item:",
        error.response?.data || error.message
      );
    }
  };
  console.log("cart", cart);
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty.</p>;
  return (
    <div className="container d-flex  mt-4 align-items-center justify-content-center">
      <div>
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="d-flex align-items-center  gap-4 border-success border-bottom py-3"
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src={item.image}
                alt=""
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <div>
                <p className="mb-0 fw-bold">{item.productName}</p>
                <div className="d-flex gap-2">
                  <Button size="small" variant="">
                    -
                  </Button>
                  <Button size="small" variant="">
                    +
                  </Button>
                </div>
              </div>
            </div>
            <div className=" d-flex gap-5">
              <p className="text-muted">{item.quantity}</p>
              <p>{item.price}</p>
              <Button
                size="small"
                variant="close"
                className="border-0"
                onClick={() => {
                  removeItemFromCart(item.productId);
                }}
              >
                delete
              </Button>
            </div>
          </div>
        ))}
        <div className="justify-content-center">
          <Button
            size="small"
            className="m-3"
            onClick={() => {
              clearCart();
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
