import { useEffect, useState } from "react";
import Input from "../../../shared/controls/Input";
import Button from "../../../shared/controls/Button";
import Modal from "bootstrap/js/dist/modal";
import AuthServices from "../../services/auth";
import CategoriesTable from "./CategoriesTable";
import SearchFun from "../components/SearchFun";

export default function Categories() {
  const [cat, setCat] = useState("");
  // const [isActive, setIsActive] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    AuthServices.fetchCategories().then((res) => setCategories(res.data));
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await AuthServices.createCategory({ name: cat });

      const res = await AuthServices.fetchCategories();
      setCategories(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error creating category:", err);
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
    <div className="container d-flex flex-column mt-5 justify-content-center align-items-center">
      <div className="d-flex flex-column container rounded mt-2 align-items-center justify-content-center">
        <SearchFun items={categories} onFilter={setFilteredCategories} />
        <CategoriesTable categories={filteredCategories} />
        <div className="d-flex justify-content-center">
          <Button
            type="button"
            size="small"
            className=""
            onClick={() => {
              displayModal();
            }}
          >
            Add Category
          </Button>
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content justify-content-center text-center ">
              <h4 className="modal-title mt-3">Add Category</h4>

              <div className="modal-body">
                <form className="d-flex flex-column gap-3 align-items-center justify-content-center">
                  <div className=" d-flex aling-items-center justify-content-between gap-3">
                    <label> Name</label>
                    <Input
                      type="text"
                      className="form-control"
                      id="cat"
                      placeholder="Enter category name (Alphabets)"
                      name="cat"
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    className="px-5 mt-2"
                    onClick={onSubmit}
                  >
                    ADD
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
    </div>
  );
}
