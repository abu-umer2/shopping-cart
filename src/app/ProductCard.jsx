import Button from "../../src/app/shared/controls/Button";
const ProductCard = ({ product }) => {
  return (
    <div className="card" style={{ width: "250px" }}>
      {product.image && (
        <img
          className="card-img-top"
          src={product.image}
          alt={product.name}
          width="150px"
          height="150px"
        />
      )}
      <div class="card-body">
        <h3 className="card-title">{product.name}</h3>

        <div>{product.price}</div>
        <Button className="btn  " size="small">
          More Info
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
