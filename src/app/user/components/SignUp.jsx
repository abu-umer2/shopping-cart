import Input from "../../shared/controls/Input";
import Button from "../../shared/controls/Button";
const SignUp = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className=" d-flex flex-column m-5 p-5 p3 gap-4 border  border-2 rounded"
        style={{ width: "500px", backgroundColor: "white" }}
      >
        <div className="d-flex justify-content-between ">
          <label htmlFor="">First Name:</label>{" "}
          <Input placeholder="Enter Your first name" />
        </div>

        <div className="d-flex justify-content-between ">
          <label htmlFor="">Last Name:</label>{" "}
          <Input placeholder="Enter Your last name" />
        </div>

        <div className="d-flex justify-content-between ">
          <label htmlFor="">Email:</label>{" "}
          <Input placeholder="Enter Your email" />
        </div>

        <div className="d-flex justify-content-between ">
          <label htmlFor="">Username:</label>{" "}
          <Input placeholder="Enter Your username" />
        </div>
        <div className="d-flex justify-content-between ">
          <label htmlFor="">Password:</label>
          <Input placeholder="Enter your Password" />
        </div>

        <Button size="small">Sign Up</Button>
      </div>
    </div>
  );
};

export default SignUp;
