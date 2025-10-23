import { useState } from "react";
import userImg from "../../assits/banner1.jpg";
import "./common.scss";
import Button from "../../shared/controls/Button";
import CommomUtils from "../common/utils";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLogin, updateIsLogin] = useState(false);

  const user = localStorage.getItem("adminAuth");
  console.log("user", user);
  const handleToggle = (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    setIsExpanded(expanded);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      {isLogin && (
        <div>
          <CommomUtils.ShowDialog
            childComponent={<Login updateIsLogin={updateIsLogin}></Login>}
          />
        </div>
      )}

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
        {user ? (
          <div
            class="dropdown"
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
                src={userImg}
                alt="user"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </a>
          </div>
        ) : (
          <div className="dropdown">
            <Button
              size="small"
              className="btn btn-secondary border-0 px-2"
              type="button"
              onClick={() => updateIsLogin(true)}
              s
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
