import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";
import { useState } from "react";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" ">
      <div className="text-center">
        <p>Create a new account </p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <form className="row g-3 p-3  w-50">
          <div className="col-md-6">
            <label htmlFor="">Username:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Email:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              First Name:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Last Name:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Password:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              Phone Number:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12">
            <label htmlFor="" className="form-label">
              Street:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-12">
            <label htmlFor="" className="form-label">
              City:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-6">
            <label htmlFor="" className="form-label">
              State:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-4">
            <label htmlFor="" className="form-label">
              Zip Code:
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-md-2">
            <label htmlFor="" className="form-label">
              Country:
            </label>
            <input type="text" className="form-control" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
