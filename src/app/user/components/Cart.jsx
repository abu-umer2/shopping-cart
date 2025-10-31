import { useSelector } from "react-redux";

function CartList() {
  const data = useSelector((state) => state.data);
  console.log("dat", data);
  if (!data || data.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      {data.items.map((item) => (
        <div
          key={item._id}
          style={{ border: "1px solid #ddd", margin: 10, padding: 10 }}
        >
          <h3>{item.productName || item.name}</h3>
          <p>{item.description}</p>
          <p>${item.price}</p>
          <img
            src={item.image}
            alt={item.productName || item.name}
            width="120"
          />
        </div>
      ))}
      <h3>Total: ${data.totalPrice}</h3>
    </div>
  );
}

export default CartList;
