import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../shared/controls/Button";
import CommomUtils from "../common/utils";
import { useState } from "react";
import Login from "./Login";
import { useDispatch } from "react-redux";
import CartServices from "../../services/cartServices";
import { addTocart } from "../data/cartSlice";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, updateIsLogin] = useState(false);
  const { product } = location.state || {};
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1);
  };
  function handelAddToCart(product) {
    console.log("pro", product);
    const user = sessionStorage.getItem("token");
    if (!user) {
      updateIsLogin(true);
    }
    CartServices.addItemToCart(product)
      .then((res) => {
        console.log("Cart synced with backend:", res.data);
        dispatch(addTocart(product));
      })
      .catch((err) => console.error("Failed to sync cart:", err));

    // ;
  }

  return (
    <div className="container row m-md-3 border border-2 rounded ">
      {isLogin && (
        <div>
          <CommomUtils.ShowDialog childComponent={<Login></Login>} />
        </div>
      )}
      <div className="row g-4">
        <div className="col-md-6 col-sm-12 col-sm-12 d-flex justify-content-center align-items-center ">
          <img
            src={product?.image}
            alt={product?.name}
            style={{ height: "500px" }}
          />
        </div>
        <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between p-md-3 gap-2">
          <h3 className="fw-bold mb-2 text-center text-md-start">
            Name: {product.name}
          </h3>
          <p className="mb-1 text-muted text-center text-md-start">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="mb-1 text-center text-md-start">
            <strong>Price:</strong>
            {product.price}$
          </p>
          <p className="mb-1 text-center text-md-start">
            <strong>Size:</strong>
            {product.size}
          </p>
          <p className="mb-1 text-center text-md-start">
            <strong>Ratings:</strong>
            {product.ratings}
          </p>
          <p className="mb-1 text-center text-md-start">
            <strong>Stock:</strong>
            {product.stock}
          </p>

          <div className="mt-3 d-flex gap-3">
            <Button
              className=" w-50"
              size="small"
              onClick={() => handelAddToCart(product)}
            >
              Add to Cart
            </Button>
            <button className="btn btn-secondary w-50" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
