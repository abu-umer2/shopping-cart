import React from "react";
import "./common.scss";
export default function Header() {
  return (
    <div className="header d-flex justify-content-between align-items-center px-3">
      <i class="fa fa-opencart fa-lg" style={{ color: "white" }}></i>
      <div className="d-flex align-items-center justify-content-center bg-white px-2 rounded ">
        <input
          type="text"
          className="header__search mb-2 "
          style={{ border: "none" }}
          placeholder="Search..."
        />
        <i className="fa fa-search fa-2x" style={{ color: "gray" }}></i>
      </div>
      <i className="fa fa-user-circle fa-2x" style={{ color: "white" }}></i>
    </div>
  );
}
