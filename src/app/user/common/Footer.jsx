export default function Footer() {
  return (
    <footer className="bg-dark text-white ">
      <div
        className=" fw-bold align-items-center text-center pt-3 justify-content-cnter pb-2"
        style={{ backgroundColor: "#303c45" }}
      >
        Back To Top
      </div>

      <div className="container row mt-5 p-5 mx-5 ">
        <div className="col-md-3 col-sm-12 mb-4 ">
          <p className="fw-bold">Get to Know Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>About Sh-Cart</li>
            <li>Careers</li>
            <li>Sh-Cart Science</li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <p className="fw-bold">Shop with Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Your Account</li>
            <li>Your Orders </li>
            <li>Your Addresses </li>
            <li>Your Lists </li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <p className="fw-bold">Make Money with Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Protect and build your brand</li>
            <li>Sell on Sh-Cart</li>
            <li>Fulfillment by Sh-Cart</li>
            <li>Supply to Sh-Cart</li>
            <li>Become an Affiliate</li>
            <li>dvertise Your Products</li>
          </ul>
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <p className="fw-bold">Let Us Help You</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Help</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Replacements</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>Sh-Cart App Download</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="d-flex align-items-center justify-content-center gap-3">
        <i class="fa fa-opencart fa-2x" style={{ color: "white" }}></i>
        <select name="" id="" className="bg-dark text-white border-none">
          <option value="english">English</option>
          <option value="arabic">Arabic</option>
        </select>
        <select className="bg-dark text-white border-none">
          <option value="sudan">🇸🇩 Sudan</option>
          <option value="india">🇮🇳 India</option>
        </select>
      </div>
    </footer>
  );
}
