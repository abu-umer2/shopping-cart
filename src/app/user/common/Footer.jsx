import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white ">
      <div className="bg-gray align-items-center text-center pt-3 justify-content-cnter">
        Back To Top
      </div>
      <div className="container row mt-5 p-5">
        <div className="col ms-5">
          <p>Get to Know Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>About Amazon</li>
            <li>Careers</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div className="col">
          <p>Shop with Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Your Account</li>
            <li>Your Orders </li>
            <li>Your Addresses </li>
            <li>Your Lists </li>
          </ul>
        </div>
        <div className="col">
          <p>Make Money with Us</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Protect and build your brand</li>
            <li>Sell on Amazon</li>
            <li>Fulfillment by Amazon</li>
            <li>Supply to Amazon</li>
            <li>Become an Affiliate</li>
            <li>dvertise Your Products</li>
          </ul>
        </div>
        <div className="col">
          <p>Let Us Help You</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>Help</li>
            <li>Shipping & Delivery</li>
            <li>Returns & Replacements</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>Amazon App Download</li>
          </ul>
        </div>
      </div>
      <div></div>
    </footer>
  );
}
