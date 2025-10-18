import React, { useEffect, useState } from "react";
import ProductServices from "../../services/productServices";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BestSelling = () => {
  const [bestSelling, setBestSelling] = useState([]);
  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const res = await ProductServices.fetchProducts();
        const allProducts = res.data || [];
        const filtered = allProducts.filter(
          (product) => product.productType === "best_selling"
        );
        setBestSelling(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchBestSelling();
  }, []);

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          left: "0px",
          right: "auto",
          //   background: "#e2e8f0",
          padding: "0.5rem",
          borderRadius: "50%",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ChevronLeft size={20} color="gray" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{
          ...style,
          right: "0px",
          left: "auto",
          //   background: "#e2e8f0",
          padding: "0.5rem",
          borderRadius: "50%",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <ChevronRight size={20} color="gray" />
      </button>
    );
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className=" bg-white pe-2 justify-content-center align-items-center">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Best Selling Products</h2>
        <Slider {...settings}>
          {bestSelling.map((product) => (
            <div key={product._id} className="px-2">
              <div className="bg-white rounded-xl shadow-md p-4 text-center">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="h-48 w-full object-cover rounded-lg"
                />
                <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSelling;
