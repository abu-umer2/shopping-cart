import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductServices from "../../services/productServices";
export default function Menu() {
  var [category, updateCat] = useState([]);
  useEffect(() => {
    ProductServices.fetchCategories().then(data=>{
      console.log(data.data);
    updateCat(data.data);
    })
  }, []);
  function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return as is for non-string or empty inputs
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              {category.map((obj) => {

                return (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {capitalizeFirstLetter(obj.name)}
                    </Link>
                    <ul className="dropdown-menu">
                     
                      <li>
                        <Link className="dropdown-item" to="subcat">
                          Sub category
                        </Link>
                      </li>
                      
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
