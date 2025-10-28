import { useState } from "react";
import userImg from "../../assits/banner1.jpg";
import "./common.scss";
import Button from "../../shared/controls/Button";
import CommomUtils from "../common/utils";
import Login from "../components/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./../data/reducer";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLogin, updateIsLogin] = useState(false);
  const [isOpen, updateIsOpen] = useState(false);
  const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

  // alert(data)
  const admin = sessionStorage.getItem("adminAuth");
  const user = sessionStorage.getItem("userAuth");
  let productCount=data;
  // let [productCount,updateProductCount]=useState(0)
  console.log("user", user);
  const handleToggle = (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    setIsExpanded(expanded);
  };
  setTimeout(()=>{
  //  updateProductCount(localData? localData.length : 0)
  },100)

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
        <div
          className=" countDiv"
          onClick={() => updateIsOpen((prev) => !prev)}
        >
          {user || admin ? (
            <div className="dropdown">
              {productCount}
              {isOpen && (
                <ul
                  className="dropdown-menu show position-absolute end-0 mt-2 shadow rounded"
                  style={{ minWidth: "150px" }}
                >
                  <li>
                    <button className="dropdown-item">Profile</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Orders</button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={() => {
                        sessionStorage.clear();
                        localStorage.clear();
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
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
        {/* <button
          onClick={() => {
            const obj = { type: "Inc", payload: productCount };
            dispatch(obj);
          }}
        >
          Update
        </button> */}
      </div>
    </nav>
  );
}
