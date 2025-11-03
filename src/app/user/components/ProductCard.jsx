import { useNavigate } from "react-router-dom";
import Button from "../../shared/controls/Button";
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="card border-0 shadow" style={{ width: "300px" }}>
      {product.image && (
        <img
          className="card-img-top"
          src={product.image}
          alt={product.name}
          width="150px"
          height="200px"
        />
      )}
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className="d-flex justify-content-between">
          <div>Price:{product.price}$</div>
          <div>Size:{product.size}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div>Ratings:{product.ratings}</div>
          <div>Stock:{product.stock}</div>
        </div>

        <div className="justify-content-between">
          <Button
            className="w-100 my-2 "
            size="small"
            onClick={() =>
              navigate("../productDetails", { state: { product } })
            }
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
