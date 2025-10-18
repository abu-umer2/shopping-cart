import React from "react";
import Banner from "../common/Banner";
import BestSelling from "./BestSelling";

export default function Landing() {
  return (
    <div className="bg-secondary ">
      <div>
        <Banner />
        <BestSelling />
      </div>
    </div>
  );
}
