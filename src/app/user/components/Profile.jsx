const Profile = () => {
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log("profile1", user);
  return (
    <div className="d-flex  containter w-100 align-items-center justify-content-center   bg-light">
      <div className="d-flex flex-column w-50 align-items-center bg-white justify-content-center gap-2 m-3 shadow p-3 m-3 rounded-2 ">
        <div className="d-flex  justify-content-between w-100">
          <label htmlFor="">First Name</label>
          <input type="text" value={user.firstName} />
        </div>
        <div className="d-flex justify-content-between w-100">
          <label htmlFor="">Last Name</label>
          <input type="text" value={user.lastName} />
        </div>
        <div className="d-flex justify-content-between w-100">
          <label htmlFor="">Email</label>
          <input type="text" value={user.email} />
        </div>
        <div className="d-flex justify-content-between w-100">
          <label htmlFor="">Phone Number</label>
          <input type="text" value={user.phoneNumber} />
        </div>
        {user.shippingAddresses.map((item) => (
          <div className="d-flex flex-column w-100 align-items-center justify-content-center gap-2 m-3 ">
            <div className="d-flex justify-content-between w-100">
              <label htmlFor="">Country</label>

              <input type="text" value={item.country} className="" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <label htmlFor="">State</label>

              <input type="text" value={item.state} className="" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <label htmlFor="">City</label>

              <input type="text" value={item.city} className="" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <label htmlFor="">Street</label>

              <input type="text" value={item.street} className="" />
            </div>
            <div className="d-flex justify-content-between w-100">
              <label htmlFor="">Zip Code</label>

              <input type="text" value={item.zipCode} className="" />
            </div>
          </div>
        ))}

        <div className="d-flex align-items-center mb-3">
          <strong className="me-3" style={{ width: 100 }}>
            Name:
          </strong>
          <>
            <input style={{ width: 250 }} />
            <button variant="success" className="ms-2">
              Save
            </button>
            <button variant="secondary" className="ms-1">
              Cancel
            </button>
          </>
          <>
            <span className="me-3">name</span>
            <button size="sm" variant="outline-primary">
              Edit
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default Profile;
