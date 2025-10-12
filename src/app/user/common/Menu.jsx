import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductServices from "../../services/productServices";
export default function Menu() {
  var [category, updateCat] = useState([]);
  var [subCategories, updateSubCategories] = useState([]);
  useEffect(() => {
    ProductServices.fetchCategories().then((data) => {
      console.log(data.data);
      updateCat(data.data);
      console.log("cateiesqq", data.data);
    });
  }, []);

  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
      return str;
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
                  <li key={obj._id} className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      {capitalizeFirstLetter(obj.name)}
                    </Link>
                    <ul className="dropdown-menu">
                      {obj.subCategories.map((sub) => {
                        const product_path="productsList/"+sub._id
                        return (<li key={sub._id}>
                          <Link className="dropdown-item" to={product_path}>
                            {capitalizeFirstLetter(sub.name)}
                          </Link>
                        </li>
                        )
                      })}
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
