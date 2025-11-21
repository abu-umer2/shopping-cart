import CartServices from "../../services/cartServices";
import Button from "../../shared/controls/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  emptyCart,
  setCartItems,
  updateQuantity,
} from "../data/cartSlice";
import { useEffect } from "react";
const Cart = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) return;
    const getCart = async () => {
      try {
        const response = await CartServices.getCart();
        dispatch(setCartItems(response.data.items));
        console.log("cart", response.data.items);
      } catch (error) {
        console.error(
          "Failed to get cart",
          error.response?.data || error.message
        );
      }
    };

    getCart();
  }, [dispatch, token]);

  const cart = useSelector((state) => state.cart);

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

  const handleIncrease = async (productId, currentQty) => {
    const newQty = currentQty + 1;
    await CartServices.updateItemQuantity(productId, newQty);
    dispatch(updateQuantity({ productId, quantity: newQty }));
  };

  const handleDecrease = async (productId, currentQty) => {
    const newQty = currentQty - 1;
    await CartServices.updateItemQuantity(productId, newQty);
    dispatch(updateQuantity({ productId, quantity: newQty }));
  };

  console.log("cart", cart);
  if (!cart.items || cart.items.length === 0) return <p>Your cart is empty.</p>;
  return (
    <div className="container d-flex mt-4 align-items-center justify-content-center">
      <div>
        {cart.items.map((item) => (
          <div
            key={item._id}
            className="d-flex align-items-center gap-4 border-bottom py-3"
          >
            <div className="d-flex align-items-center gap-2">
              <img
                src={`http://localhost:1000/uploads/products/${item.image}`}
                alt=""
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
              <div>
                <p className="mb-0 fw-bold">{item.productName}</p>

                <div className="quantity-controls d-flex align-items-center gap-2">
                  <button
                    onClick={() =>
                      handleDecrease(item.productId, item.quantity)
                    }
                    className="rounded-2 bg-white"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    className="text-center border-2 rounded-2"
                    readOnly
                    style={{ width: "25px" }}
                  />
                  <button
                    onClick={() =>
                      handleIncrease(item.productId, item.quantity)
                    }
                    className="rounded-2 bg-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex gap-5">
              <p>{item.price * item.quantity}</p>

              <i
                className="fa fa-trash-o"
                style={{ fontSize: "30px", color: "red" }}
                onClick={() => removeItemFromCart(item.productId)}
              ></i>
            </div>
          </div>
        ))}
        <p className="fw-bold text-center mt-3 ">
          Total Amount:
          <span className="border m-2 border-2 border-black p-2 rounded-2">
            {cart.cartTotoalAmount}
          </span>
        </p>
        <div className="text-center">
          <Button size="small" className="m-3" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
