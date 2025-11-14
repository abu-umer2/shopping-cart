import { useState } from "react";
import Button from "../shared/controls/Button";
import { useNavigate } from "react-router-dom";
import Input from "../shared/controls/Input";
import AuthServices from "./services/auth";
export default function AdminLanding() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthServices.CheckLogin(username, password);
      console.log(res.data);
      localStorage.setItem("adminAuth", 1);
      nav("/adminHome");
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
