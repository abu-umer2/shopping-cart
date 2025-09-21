import React, { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import axios from "axios";

export default function Subcat() {
  const [subCat, setSunCat] = useState("");
  // const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const [catigories, setCatigories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCatigories(response.data));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3000/sub-categories")
      .then((response) => setSubCategories(response.data));
  }, []);

  const onSubmit = async () => {
    console.log("sub", subCat);
    await axios.post("http://localhost:3000/sub-categories", {
      name: subCat,
      categoryId,
    });
  };
  return (
    <div className="d-flex flex-column justify-content-center items-center">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((sub) => (
            <tr>
              <td>{sub._id}</td>
              <td>{sub.name}</td>
              <td>{sub.categoryId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add SubCategory
        </button>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content justify-content-center text-center ">
            <h4 className="modal-title mt-3">Add Category</h4>

            <div className="modal-body d-flex justify-content-center">
              <form
                className="d-flex flex-column m-5 p-5 gap-3"
                style={{ width: "500px" }}
              >
                <div className="d-flex flex-column gap-2 align-items-start ">
                  <label className="">Enter Sub category name</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="subCat"
                    placeholder="Enter subcategory"
                    name="subCat"
                    value={subCat}
                    onChange={(e) => setSunCat(e.target.value)}
                  />
                </div>
                <div className="d-flex flex-column gap-2 align-items-start">
                  <label>Choose Category</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {catigories.map((cat) => {
                      return (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  className="btn px-5"
                  onClick={onSubmit}
                >
                  ADD SUB
                </Button>
              </form>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                className="btn btn-primary mb-2 "
                style={{ width: "100px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
