import React from "react";
import "./common.scss";
export default function Header() {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-between align-items-center ">
      <div class="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <i className="fa fa-opencart fa-lg" style={{ color: "white" }}></i>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <div
            className="d-flex align-items-center justify-content-center bg-white px-2 rounded "
            id="collapsibleNavbar"
          >
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
      </div>
    </div>
  );
}
