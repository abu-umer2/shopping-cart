import React from "react";

const Profile = () => {
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("profile1", user);
  return (
    <div className="containter bg-light">
      <div className="d-flex flex-column align-items-center justify-content-center gap-2 m-4 border border-2 p-3">
        <div className="d-flex  justify-content-between w-75">
          <label htmlFor="">First Name</label>
          <input type="text" value={user.firstName} />
        </div>
        <div className="d-flex justify-content-between w-75">
          <label htmlFor="">First Name</label>
          <input type="text" value={user.firstName} />
        </div>
        <div className="d-flex justify-content-between w-75">
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} />
        </div>
        <div className="d-flex justify-content-between w-75">
          <label htmlFor="">Last Name</label>
          <input type="text" value={user.lastName} />
        </div>
        <div className="d-flex justify-content-between w-75">
          <label htmlFor="">Phone Number</label>
          <input type="text" value={user.phoneNumber} />
        </div>
        <div className="d-flex justify-content-between w-75">
          <label htmlFor="">First Name</label>
          <input type="text" value={user.firstName} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
