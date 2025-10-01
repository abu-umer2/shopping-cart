import { useEffect, useRef, useState } from "react";
import Button from "../../../shared/controls/Button";
import Input from "../../../shared/controls/Input";
import api from "../../services/auth";
import ProductsTable from "./ProductsTable";
import Modal from "bootstrap/js/dist/modal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [review, setReview] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [stock, setStock] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const modalRef = useRef(null);

  useEffect(() => {
    const response = api.get("/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
    console.log(response.data);
    api.get("/categories").then((response) => setCategories(response.data));
  }, []);
  console.log("cat", category);
  useEffect(() => {
    if (!category) return;
    api
      .get(`/sub-categories/subs/${category}`)
      .then((response) => setSubCategories(response.data));
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      console.log("preview URL:", previewUrl);
    }
  };

  const onSubmit = async (e) => {
    setError(false);

    e.preventDefault();
    if (!error) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("review", review);
      formData.append("categoriesId", category);
      formData.append("stock", stock);
      formData.append("size", size);
      formData.append("color", color);

      if (subCategory) {
        formData.append("subCategoriesId", subCategory);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (edit && selectedProduct.image) {
        formData.append("image", selectedProduct.image);
      }
      console.log("for", formData);
      try {
        if (edit) {
          await api.patch(`/products/${selectedProduct._id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setEdit(false);
          //closeModal();
        } else {
          await api.post("/products", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          alert("Product added successfully!");
        }
        resetForm();

        const res = await api.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
        alert("Error adding product");
      }
    }
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setName("");
    setDescription("");
    setPrice("");
    setReview("");
    setCategory("");
    setSubCategory("");
    setImageFile(null);
    setImagePreview(null);
    setError(false);
    setColor("");
    setSize("");
    setStock(0);
    displayModal();
  };
  function loadUpdates(pro) {
    console.log(pro);
    setSelectedProduct(pro);
    setName(pro.name || "");
    setDescription(pro.description || "");
    setPrice(pro.price || "");
    setReview(pro.review || "");
    setCategory(pro.categoriesId._id || "");
    setSubCategory(pro.subCategoriesId._id || "");
    setStock(pro.stock._id || "");
    setSize(pro.stock._id || "");
    setImagePreview(pro.image || null);
    displayModal();
  }
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
    <div>
      <ProductsTable
        products={products}
        updateMethod={loadUpdates}
        setEdit={setEdit}
      />
      <Button
        type="button"
        size="small"
        className="btn btn-primary"
        ref={modalRef}
        onClick={() => resetForm()}
      >
        Add Product
      </Button>
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered modal-xl  ">
          <div className="modal-content">
            <div className="modal-body ">
              {/* from */}
              <form className="overflow-hidden" onSubmit={onSubmit}>
                <div className="row">
                  {/* Left side */}
                  <div className="col-12 col-md-6 d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3 justify-content-between">
                      <label>Name:</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {error && name === "" ? "Enter Product" : ""}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <label>Category:</label>
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: "250px" }}
                      >
                        <option>Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="error-message">
                      {error && category === "" ? "choose Category" : ""}
                    </div>

                    <div className="d-flex align-items-center gap-3 justify-content-between">
                      <label>Size:</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter product size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {error && size === "" ? "Enter size" : ""}
                    </div>

                    <div className="d-flex align-items-center  justify-content-between">
                      <label>Description:</label>
                      <textarea
                        name="discription"
                        className=" form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {error && description === "" ? "Enter Desctiption" : ""}
                    </div>
                  </div>
                  {/* Right side */}
                  <div className="col-12 col-md-6 d-flex flex-column gap-3 ">
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Price:</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter Product Name"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {error && price === "" ? "Enter price" : ""}
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <label>Sub-Category:</label>
                      <select
                        className="form-select"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        style={{ width: "250px" }}
                      >
                        <option>Select sub-Category</option>
                        {subCategories.map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            {sub.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="error-message">
                      {error && subCategory === "" ? "Choose Sub-category" : ""}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-3 justify-content-between mb-2">
                        <label>Color:</label>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Enter The product color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div className="error-message">
                        {error && color === "" ? "Enter color" : ""}
                      </div>
                      <div className="d-flex align-items-center mb-3 justify-content-between">
                        <label>Stock:</label>
                        <Input
                          className="form-control"
                          type="number"
                          placeholder="Enter Product Stok"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div className="error-message">
                        {error && stock === "" ? "Enter stock" : ""}
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <label>Image:</label>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          style={{ width: "250px" }}
                        />
                      </div>
                      {imagePreview && (
                        <div>
                          <img
                            src={imagePreview || null}
                            alt="Preview"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="error-message">
                    {error && imageFile === "" ? "Upload image" : ""}
                  </div>
                </div>

                {/* control buttons */}

                <div className="d-flex justify-content-center align-items-center gap-4 p-1">
                  <Button
                    size="small"
                    type="submit"
                    className="btn btn-danger px-5"
                  >
                    {edit ? "Update Product" : "Add Product"}
                  </Button>

                  <Button
                    type="button"
                    className="btn btn-danger px-5"
                    data-bs-dismiss="modal"
                    size="small"
                    onClick={() => {
                      setEdit(false);
                      resetForm();
                      closeModal();
                    }}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
