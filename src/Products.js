import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./app/ProductCard";
import ProductServices from "./app/user/services/productServices";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { subId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductServices.fetchProductsBySub(subId);
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (subId) fetchProducts();
  }, [subId]);
  return (
    <div className="container mt-4 ">
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => {
          return (
            <div key={product._id} className="col-md-3 mb-4">
              <ProductCard key={product._id} product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
