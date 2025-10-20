import React, { useState } from "react";
import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className=" d-flex flex-column m-5 p-5 p3 gap-4 border  border-2 rounded"
        style={{ width: "500px",backgroundColor:'white' }}
      >
        {newUser ? (
          <div className="d-flex justify-content-between ">
            <label htmlFor="">First Name:</label>{" "}
            <Input placeholder="Enter Your first name" />
          </div>
        ) : (
          ""
        )}
        {newUser ? (
          <div className="d-flex justify-content-between ">
            <label htmlFor="">Last Name:</label>{" "}
            <Input placeholder="Enter Your last name" />
          </div>
        ) : (
          ""
        )}
        {newUser ? (
          <div className="d-flex justify-content-between ">
            <label htmlFor="">Email:</label>{" "}
            <Input placeholder="Enter Your email" />
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-between ">
          <label htmlFor="">Username:</label>{" "}
          <Input placeholder="Enter Your username" />
        </div>
        <div className="d-flex justify-content-between ">
          <label htmlFor="">Password:</label>
          <Input placeholder="Enter your Password" />
        </div>

        {newUser ? (
          <Button size="small">Sign Up</Button>
        ) : (
          <Button size="small">Login</Button>
        )}
        {newUser ? (
          <p onClick={() => setNewUser(false)}>
            I have an account <span className="text-primary">Login</span>
          </p>
        ) : (
          <p onClick={() => setNewUser(true)}>
            I'm A new User <span className="text-primary">Register</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
