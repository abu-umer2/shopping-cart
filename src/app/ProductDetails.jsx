import { useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/controls/Button";
import CommomUtils from "./user/common/utils";
import { useState } from "react";
import Login from "./user/components/Login"
const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin,updateIsLogin] = useState(false)
  const { product } = location.state || {};
  const handleBack = () => {
    navigate(-1);
  };
  function addToCart(productInfo){
    if(sessionStorage.getItem("userAuth")){
      alert("Selected")
    }
    else{
    //CommomUtils.ShowDialog();
    updateIsLogin(true)
    }
  }
  return (
    <div className="container row m-3 border border-2 rounded ">
      {isLogin && (<div>
        <CommomUtils.ShowDialog childComponent={<Login></Login>} />
      </div>)}
      <div className="col-md-6 col-sm-12 p-3">
        <img
          src={product?.image}
          alt={product?.name}
          className=""
          style={{ height: "500px" }}
        />
      </div>
      <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-between p-3 gap-2">
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
          <Button className=" w-50" size="small" onClick={()=>addToCart(product)}>
            Add to Cart
          </Button>
          <button className="btn btn-secondary w-50" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
