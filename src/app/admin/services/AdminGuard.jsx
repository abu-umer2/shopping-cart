import { Navigate, Outlet } from "react-router-dom";

function AdminGuard() {
  const admin = sessionStorage.getItem("admin");
  console.log("admin", admin);

  return admin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/admin-login
  "
    />
  );
}

export default AdminGuard;
