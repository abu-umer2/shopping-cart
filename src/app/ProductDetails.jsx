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
        <h3 className="fw-bold mb-3"> Name: {product.name}</h3>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Price:</strong>
          {product.price}$
        </p>
        <p>
          <strong>Size:</strong>
          {product.size}
        </p>
        <p>
          <strong>Ratings:</strong>
          {product.ratings}
        </p>
        <p>
          <strong>Stock:</strong>
          {product.stock}
        </p>

        <div className="mt-3 d-flex gap-3">
          <button className="btn btn-outline-primary w-50">Add to Cart</button>
          <button className="btn btn-secondary w-50">Back</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
