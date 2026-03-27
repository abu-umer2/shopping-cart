import { useEffect, useState } from "react";
import OrdersServices from "../../services/orderServices";
import Order from "./Order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  console.log("order", orders);

  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    try {
      const res = await OrdersServices.getAllOrders();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    console.log("orders updated:", orders);
  }, [orders]);

  return (
    <div className="text-black" style={{ marginTop: "50px" }}>
      {orders.map((order) => (
        <div key={order._id}>
          <Order
            order={order}
            orderStatus={order.status}
            totalPrice={order.totalPrice}
          />
        </div>
      ))}
    </div>
  );
};

export default Orders;
