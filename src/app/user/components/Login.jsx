import React, { useState } from "react";
import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";
import { useNavigate } from "react-router-dom";
import ProductServices from "../../services/productServices";

const Login = ({ updateIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductServices.userLogin(username, password);
      localStorage.setItem("userAuth", 1);
      navigate("../");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Invalid username or password");
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        className=" d-flex flex-column m-5 p-5 p3 gap-4 border  border-2 rounded"
        style={{ width: "500px", backgroundColor: "white" }}
        onSubmit={onSubmit}
      >
        <p className="fs-4 fw-semibold text-center">Sign In</p>

        <div className="">
          <label htmlFor="">Username:</label>
          <Input
            type="text"
            className="form-control"
            placeholder="Enter Your username"
            name={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="">
          <label htmlFor="">Password:</label>
          <Input
            type="password"
            className="form-control"
            placeholder="Enter your Password"
            name={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <Button size="small" type="submit">
          Login
        </Button>
        <div className=" text-center">
          <p
            onClick={() => {
              navigate("./siginup");
              updateIsLogin(false);
            }}
          >
            I'm A new User{" "}
            <span className="text-primary pointer">Register</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
