import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();

  const { product } = location.state || {};

  return (
    <div className="container row m-3 border border-2 rounded ">
      <div className="col-md-6 col-sm-12 p-3">
        <img
          src={product?.image}
          alt={product?.name}
          className=""
          style={{ height: "500px" }}
        />
      </div>
      <div className="col-md-6 col-sm-12 justify-content-between p-3">
        <h3> Name: {product.name}</h3>
        <p>Description: {product.description}</p>
        <p>Price:{product.price}$</p>
        <p>Size:{product.size}</p>
        <p>Ratings:{product.ratings}</p>
        <p>Stock:{product.stock}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
