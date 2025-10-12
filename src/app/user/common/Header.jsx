import { useState } from "react";
import user from "../../assits/banner1.jpg";
import "./common.scss";
export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    setIsExpanded(expanded);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
          aria-expanded={isExpanded}
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <i
          className="fa fa-opencart fa-lg text-white"
          style={
            isExpanded
              ? {
                  position: "absolute",
                  right: "50%",
                  top: "30px",
                  transform: "translateY(-50%)",
                }
              : {}
          }
        ></i>

        <div
          className="collapse navbar-collapse justify-content-center "
          id="mynavbar"
        >
          <div className="navbar-nav d-flex  gap-4 mx-auto items-center align-items-center">
            <ul className=" navbar-nav  gap-4 mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contacts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <div className="d-flex bg-white rounded">
                <input
                  className="form-control me-2 border-0"
                  type="text"
                  placeholder="Search"
                />
                <button className="btn btn-white" type="button">
                  <i
                    className="fa fa-search fa-lg"
                    style={{ color: "gray" }}
                  ></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          style={
            isExpanded
              ? {
                  position: "absolute",
                  right: "0",
                  top: "30px",
                  transform: "translateY(-50%)",
                }
              : {}
          }
        >
          <a className="navbar-brand m-0 p-0 sm-ml-5" href="#">
            <img
              src={user}
              alt="user"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
