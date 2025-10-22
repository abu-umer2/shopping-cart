import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";
import { useState } from "react";
import ProductServices from "../../services/productServices";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      shippingAddresses: {
        street,
        city,
        state,
        zipCode,
        country,
      },
    };
    try {
      console.log("form", payload);
      await ProductServices.userSignup(payload);

      navigate("/user/login");
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
    <div className="d-flex flex-column justify-content-center align-items-center p-3 ">
      <form
        className="row w-75 bg-white p-3 rounded rounded-3 border"
        onSubmit={onSubmit}
      >
        <p className="fs-4 fw-semibold text-center">Create a new account</p>

        <div className="col-md-6">
          <label htmlFor="">Username:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="">Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="" className="form-label">
            Password:
          </label>
          <input
            type="text"
            className="form-control"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="" className="form-label">
            Street:
          </label>
          <input
            type="text"
            className="form-control"
            name="street"
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="" className="form-label">
            City:
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="" className="form-label">
            State:
          </label>
          <input
            type="text"
            className="form-control"
            name="state"
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="" className="form-label">
            Zip Code:
          </label>
          <input
            type="text"
            className="form-control"
            name="zipCode"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            name="country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className=" d-flex justify-content-between align-items-center my-2 items-center">
          <Button className="border-0 col-md-5" size="small" type="submit">
            Sign Up
          </Button>
          <Button className="border-0 col-md-5" size="small " variant="close">
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
