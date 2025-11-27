import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductServices from "./app/services/productServices";
import ProductCard from "./app/user/components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res;
        if (type === "cat") {
          res = await ProductServices.fetchProductsByCat(id);
        } else if (type === "sub") {
          res = await ProductServices.fetchProductsBySub(id);
        }
        setProducts(res?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id, type]);
  return (
    <div className="container mt-4 ">
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => {
          return (
            <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 mb-4">
              <ProductCard key={product._id} product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
