import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const UserGuard = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  console.log("userss", user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="./login" replace state={{ from: location.pathname }} />
  );
};

export default UserGuard;
