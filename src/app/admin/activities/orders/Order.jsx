import React from "react";
import Products from "../product/Products";

const Order = ({ order, orderStatus, totalPrice }) => {
  const deliveryFees = 5;
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            <th>Product Name</th>
            <th>Product quantity</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>

              <td>
                <div className="d-flex gap-2">
                  {/* <Button
                    className=""
                    size="small"
                    onClick={() => {
                      updateMethod(product);
                      setEdit(true);
                    }}
                  >
                    Update
                  </Button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex align-items-center gap-5 jsustify-content-between">
        <label>Order Status</label>
        <select className="form-select " style={{ width: "100px" }}>
          <option value={orderStatus}>{orderStatus}</option>
          <option value="canceled">canceled</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <p>Total Price: {totalPrice}</p>
      <p>Delivery Fees: {deliveryFees}</p>
      <p>Total : {totalPrice + deliveryFees}</p>
    </div>
  );
};

export default Order;
