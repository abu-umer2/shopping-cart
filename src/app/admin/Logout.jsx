import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  sessionStorage.removeItem("admin");
  sessionStorage.removeItem("adminToken");
  let nav = useNavigate();
  useEffect(() => {
    nav("./../../admin-login");
  });
  return <div>Logout success.</div>;
}
