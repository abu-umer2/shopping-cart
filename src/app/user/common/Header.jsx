import { useEffect, useState } from "react";
import "./common.scss";
import Button from "../../shared/controls/Button";
import CommomUtils from "../common/utils";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartServices from "../../services/cartServices";
import { setCartItems } from "../data/cartSlice";

export default function Header() {
  const [isLogin, updateIsLogin] = useState(false);
  const [isOpen, updateIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const admin = sessionStorage.getItem("adminAuth");
  const user = sessionStorage.getItem("userAuth");

  useEffect(() => {
    const getCart = async () => {
      const response = await CartServices.getCart();
      dispatch(setCartItems(response.data.items));
    };

    getCart();
  }, [dispatch]);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      {isLogin && (
        <CommomUtils.ShowDialog
          childComponent={<Login updateIsLogin={updateIsLogin}></Login>}
        />
      )}

      <div className="container-fluid d-flex justify-content-between align-items-center">
        <i className="fa fa-opencart fa-lg text-white"></i>

        <div
          className="collapse navbar-collapse justify-content-center "
          id="mynavbar"
        >
          <div className="navbar-nav d-flex  gap-4 mx-auto items-center align-items-center">
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
        <div className="d-flex gap-3 align-items-center">
          <div
            className="position-relative "
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("./cart");
            }}
          >
            <i className="fa fa-shopping-cart fa-2x text-white"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
              {items?.length || 0}
            </span>
          </div>

          <div
            className=" countDiv"
            onClick={() => updateIsOpen((prev) => !prev)}
          >
            {user || admin ? (
              <div className="dropdown">
                {isOpen && (
                  <div>
                    <ul
                      className="dropdown-menu show position-absolute end-0 mt-5 shadow rounded"
                      style={{ minWidth: "150px" }}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            navigate("./profile");
                          }}
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item">Orders</button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => {
                            sessionStorage.removeItem("userAuth");
                            window.location.reload();
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button
                size="small"
                className="btn btn-secondary border-0 px-2"
                type="button"
                onClick={() => updateIsLogin(true)}
                s
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
