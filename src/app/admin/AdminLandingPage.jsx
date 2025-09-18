import React, { useState } from "react";
import Button from "../shared/controls/Button";
import { useNavigate } from "react-router-dom";
import Input from "../shared/controls/Input";
import axios from "axios";

export default function AdminLanding() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });
      console.log(response);
      localStorage.setItem("adminAuth", 1);
      nav("../adminHome");
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center m-5">
      <h2>Admin login</h2>
      <form className="d-flex flex-column align-items-center" onSubmit={login}>
        <div className="d-flex mb-3 mt-3 justify-content-between gap-5 w-100">
          <label className="form-label">Email:</label>
          <Input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="d-flex mb-3 mt-3 justify-content-between gap-3 w-100">
          <label className="form-label">Password:</label>
          <Input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="medium"
          className="btn px-5"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
