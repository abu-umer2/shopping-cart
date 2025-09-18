import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  localStorage.clear();
  let nav = useNavigate();
  useEffect(() => {
    nav("./../../admin");
  });
  return <div></div>;
}
