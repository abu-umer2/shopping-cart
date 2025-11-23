import { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import AuthServices from "../../services/auth";
import Modal from "bootstrap/js/dist/modal";
import SubCategoriesTable from "./SubCategoriesTable";
import SearchFun from "../components/SearchFun";

export default function SubCategories() {
  const [subCat, setSunCat] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [catigories, setCatigories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [felteredSubCategories, setFelteredSubCategories] =
    useState(subCategories);

  useEffect(() => {
    try {
      AuthServices.fetchCategories().then((dt) => setCatigories(dt.data));
      AuthServices.fetchAllSubCategories().then((dt) =>
        setSubCategories(dt.data)
      );
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("sub", subCat);
      await AuthServices.createSubCategory({ name: subCat, categoryId });

      const dt = await AuthServices.fetchAllSubCategories();
      setSubCategories(dt.data);

      const modalEl = document.getElementById("myModal");
      let modal = Modal.getInstance(modalEl);
      if (!modal) {
        modal = new Modal(modalEl);
      }
      modal.hide();

      setSunCat("");
      setCategoryId("");
    } catch (err) {
      console.error("Error creating subcategory:", err);
    }
  };

  function displayModal() {
    const myModalElement = document.getElementById("myModal");
    if (myModalElement) {
      let myModal = Modal.getInstance(myModalElement);
      if (!myModal) {
        myModal = new Modal(myModalElement);
      }
      myModal.show();
    }
  }
  const closeModal = () => {
    const myModalElement = document.getElementById("myModal");
    if (myModalElement) {
      const modal = Modal.getInstance(myModalElement);
      if (modal) {
        modal.hide();
      }
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <SearchFun items={subCategories} onFilter={setFelteredSubCategories} />
      <SubCategoriesTable subCategories={felteredSubCategories} />

      <div className="d-flex justify-content-center">
        <Button
          type="button"
          size="small"
          className=""
          onClick={() => {
            displayModal();
          }}
        >
          Add SubCategory
        </Button>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content justify-content-center text-center ">
            <h4 className="modal-title mt-3">Add Category</h4>

            <div className="modal-body d-flex justify-content-center">
              <form
                className="d-flex flex-column m-5 p-5 gap-3"
                style={{ width: "500px" }}
                onSubmit={onSubmit}
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
                >
                  ADD SUB
                </Button>
              </form>
            </div>

            <div className="d-flex justify-content-center">
              <Button
                type="button"
                className="px-5"
                data-bs-dismiss="modal"
                size="small"
                variant="close"
                onClick={() => {
                  closeModal();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
