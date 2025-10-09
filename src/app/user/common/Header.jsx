import { Link } from "react-router-dom";
import user from "../../assits/banner1.jpg";
import "./common.scss";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <i className="fa fa-opencart fa-lg" style={{ color: "white" }}></i>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="mynavbar">
          <ul className="navbar-nav d-flex flex-row gap-4 mx-auto">
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
          <form className="d-flex gap-2">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-primary" type="button">
              Search
            </button>
            <a className="navbar-brand" href="#">
              <img
                src={user}
                alt="user"
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
                className="rounded-pill"
              />
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
}
