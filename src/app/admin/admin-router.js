import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

import React from "react";
import Home from "./activities/Home";

export default function adminRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={Home}></Route>
      </Routes>
    </BrowserRouter>
  );
}
