import banner1 from "../../assits/banner1.jpg";
import banner2 from "../../assits/banner2.jpg";
import banner3 from "../../assits/banner3.jpg";
export default function Banner() {
  return (
    <div id="demo" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators/dots */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="2"
        ></button>
      </div>
      {/* The slideshow/carousel */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={banner1}
            alt="Los Angeles"
            className="d-block"
            style={{ width: "100%", height: "576px" }}
          />
        </div>
        <div className="carousel-item active">
          <img
            src={banner2}
            alt="Los Angeles"
            className="d-block"
            style={{ width: "100%", height: "576px" }}
          />
        </div>
        <div className="carousel-item active">
          <img
            src={banner3}
            alt="Los Angeles"
            className="d-block"
            style={{ width: "100%", height: "576px" }}
          />
        </div>
      </div>
      {/* Left and right controls/icons  */}
      <div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}
