import { useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/controls/Button";
import CommomUtils from "./user/common/utils";
import { useState } from "react";
import Login from "./user/components/Login";
const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, updateIsLogin] = useState(false);
  const { product } = location.state || {};
  const handleBack = () => {
    navigate(-1);
  };
// function addToCart(productInfo){ console.log(productInfo) 
//   let selectedProducts=[];
//    if(sessionStorage.getItem("userAuth"))
//     { if(localStorage.getItem("cartProducts")){ 
//       alert("Exec...") 
//       selectedProducts=JSON.parse(localStorage.getItem("cartProducts"));
//      } 
//      var obj={pid:productInfo._id,qty:1} 
//      selectedProducts.push(obj) 
//      localStorage.setItem("cartProducts",JSON.stringify(obj)) } 
//      else{ CommomUtils.ShowDialog(); updateIsLogin(true) } }
function addToCart(productInfo) {
    console.log(productInfo);

    let selectedProducts = [];

    // Check if user is authenticated
    if (sessionStorage.getItem("userAuth")) {
        
        // Check if cart already exists in localStorage
        if (localStorage.getItem("cartProducts")) {
            selectedProducts = JSON.parse(localStorage.getItem("cartProducts"));
        }

        // Check if the product already exists in the cart
        //let productIndex = selectedProducts.findIndex(product => product.pid === productInfo._id);
        // if (productIndex !== -1) {
        //     // If the product exists, increase the quantity
        //     selectedProducts[productIndex].qty += 1;
        // } else
             {
            // If the product doesn't exist, add it to the cart
            let obj = { pid: productInfo._id, qty: 1 };
            selectedProducts.push(obj);
        }

        // Store the updated cart in localStorage
        localStorage.setItem("cartProducts", JSON.stringify(selectedProducts));
    } else {
        // If not authenticated, show login dialog
        // CommomUtils.ShowDialog(); // Uncomment this if you want to show a login dialog
        updateIsLogin(true);
    }
}

  return (
    <div className="container row m-3 border border-2 rounded ">
      {isLogin && (
        <div>
          <CommomUtils.ShowDialog childComponent={<Login></Login>} />
        </div>
      )}
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
          <Button
            className=" w-50"
            size="small"
            onClick={() => addToCart(product)}
          >
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
