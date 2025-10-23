import React, { useState } from "react";
import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";
import { useNavigate } from "react-router-dom";
import ProductServices from "../../services/productServices";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductServices.userLogin(username, password);
      sessionStorage.setItem("userAuth", 1);
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
        <div className="d-flex justify-content-between ">
          <label htmlFor="">Username:</label>{" "}
          <Input
            placeholder="Enter Your username"
            name={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-between ">
          <label htmlFor="">Password:</label>
          <Input
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
        {newUser ? (
          <p onClick={() => setNewUser(false)}>
            I have an account <span className="text-primary">Login</span>
          </p>
        ) : (
          <p onClick={() => setNewUser(true)}>
            I'm A new User <span className="text-primary">Register</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
