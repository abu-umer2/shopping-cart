import Header from "./common/Header";
import Footer from "./common/Footer";
import Menu from "./common/Menu";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Link, Outlet } from "react-router-dom";
const UserLandingPage = () => {
  return (
    <div>
      <Header />
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Products
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="cat">
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="subcat">
                      Sub category
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="product">
                      Product
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLandingPage;
