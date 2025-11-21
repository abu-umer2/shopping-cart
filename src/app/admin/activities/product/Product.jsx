import { useEffect, useRef, useState } from "react";
import Button from "../../../shared/controls/Button";
import Input from "../../../shared/controls/Input";
import ProductsTable from "./ProductsTable";
import Modal from "bootstrap/js/dist/modal";
import AuthServices from "../../services/auth";
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
  const [edit, setEdit] = useState(false);
  const [stock, setStock] = useState("");
  const [productType, setProductType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({});

  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const modalRef = useRef(null);
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);
  const stockRef = useRef(null);
  const sizeRef = useRef(null);
  const colorRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await AuthServices.fetchProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await AuthServices.fetchCategories();
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);
  useEffect(() => {
    if (!category) return;
    const fetchSubCategories = async () => {
      try {
        const res = await AuthServices.fetchSubCategories(category);
        setSubCategories(res.data);
      } catch (error) {
        console.error("Error fetching subCategories:", error);
      }
    };
    fetchSubCategories();
  }, [category]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setCurrentImages((prev) => [...prev, ...previews]);
  };

  const removeCurrentImage = (img) => {
    setCurrentImages((prev) => prev.filter((i) => i !== img));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!nameRef.current.value.trim()) {
      newErrors.name = "Name is Required";
    }

    if (!priceRef.current.value.trim()) {
      newErrors.price = "Price is Required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }

    if (!subCategory) {
      newErrors.subCategory = "SubCategory is required";
    }
    if (!descriptionRef.current.value.trim()) {
      newErrors.description = "Description is Required";
    }
    if (!stockRef.current.value.trim()) {
      newErrors.stock = "Stock is Required";
    }
    if (!sizeRef.current.value.trim()) {
      newErrors.size = "Size is Required";
    }
    if (!colorRef.current.value.trim()) {
      newErrors.color = "Color is Required";
    }
    if (!imageFile && !edit) {
      newErrors.image = "Image is Required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    setErrors(false);

    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("review", review);
      formData.append("categoriesId", category);
      formData.append("stock", stock);
      formData.append("productType", productType);

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
      if (newImages && newImages.length > 0) {
        newImages.forEach((file) => {
          formData.append("imageFiles", file);
        });
      }

      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, value.name);
        } else {
          console.log(key, value);
        }
      }
      console.log("for", formData);
      try {
        if (edit) {
          const removeImages = selectedProduct.imageFiles.filter(
            (img) => !currentImages.includes(img)
          );
          const formData = new FormData();
          newImages.forEach((file) => formData.append("imageFiles", file));
          if (removeImages.length > 0)
            formData.append("removeImages", JSON.stringify(removeImages));
          await AuthServices.updateProduct(selectedProduct._id, formData);
          for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
          setEdit(false);
          closeModal();
          alert("Product updated successfully!");
        } else {
          console.log("for", formData);

          await AuthServices.createProduct(formData);

          alert("Product added successfully!");
        }
        resetForm();

        fetchProducts();
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
    setColor("");
    setSize("");
    setStock("");
    setProductType("");
    setErrors({});
  };
  function loadUpdates(pro) {
    console.log(pro);
    setSelectedProduct(pro);
    setName(pro.name || "");
    setDescription(pro.description || "");
    setPrice(pro.price || "");
    setReview(pro.review || "");
    setCategory(pro?.categoriesId?._id || "");
    setSubCategory(pro?.subCategoriesId?._id || "");
    setStock(pro?.stock || "");
    setProductType(pro?.productType || "");
    setSize(pro?.size || "");
    setColor(pro?.color || "");
    setImagePreview(pro?.image || null);
    setCurrentImages(pro?.imageFiles || []);
    setNewImages([]);
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
        className=""
        ref={modalRef}
        onClick={() => {
          resetForm();
          displayModal();
        }}
      >
        Add Product
      </Button>
      <div
        className="modal"
        id="myModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
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
                        ref={nameRef}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.name && (
                        <p className="text-danger">{errors.name}</p>
                      )}
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
                      {errors.category && (
                        <p className="text-danger">{errors.category}</p>
                      )}
                    </div>

                    <div className="d-flex align-items-center gap-3 justify-content-between">
                      <label>Size:</label>
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Enter product size"
                        value={size}
                        ref={sizeRef}
                        onChange={(e) => setSize(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.size && (
                        <p className="text-danger">{errors.size}</p>
                      )}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <label>Product status:</label>
                      <select
                        className="form-select"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        style={{ width: "250px" }}
                      >
                        <option value="">Select Type</option>
                        <option value="available">Available</option>
                        <option value="best_selling">Best selling</option>
                        <option value="upcoming"> Up Coming</option>
                      </select>
                    </div>
                    <div className="error-message">
                      {errors.subCategory && (
                        <p className="text-danger">{errors.subCategory}</p>
                      )}
                    </div>
                    <div className="d-flex align-items-center  justify-content-between">
                      <label>Description:</label>
                      <textarea
                        name="discription"
                        className=" form-control"
                        value={description}
                        ref={descriptionRef}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.description && (
                        <p className="text-danger">{errors.description}</p>
                      )}
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
                        ref={priceRef}
                        onChange={(e) => setPrice(e.target.value)}
                        style={{ width: "250px" }}
                      />
                    </div>
                    <div className="error-message">
                      {errors.price && (
                        <p className="text-danger">{errors.price}</p>
                      )}
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
                      {errors.subCategory && (
                        <p className="text-danger">{errors.subCategory}</p>
                      )}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-3 justify-content-between mb-2">
                        <label>Color:</label>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="Enter The product color"
                          value={color}
                          ref={colorRef}
                          onChange={(e) => setColor(e.target.value)}
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div className="error-message">
                        {errors.color && (
                          <p className="text-danger">{errors.color}</p>
                        )}
                      </div>
                      <div className="d-flex align-items-center mb-3 justify-content-between">
                        <label>Stock:</label>
                        <Input
                          className="form-control"
                          type="number"
                          placeholder="Enter Product Stok"
                          value={stock}
                          ref={stockRef}
                          onChange={(e) => setStock(e.target.value)}
                          style={{ width: "250px" }}
                        />
                      </div>
                      <div className="error-message">
                        {errors.stock && (
                          <p className="text-danger">{errors.stock}</p>
                        )}
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <label>Image:</label>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          style={{ width: "250px" }}
                        />
                        <div className="error-message">
                          {errors.image && (
                            <p className="text-danger">{errors.image}</p>
                          )}
                        </div>
                      </div>
                      {imagePreview && (
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src={
                              `http://localhost:1000/uploads/products/${imagePreview}` ||
                              null
                            }
                            alt="Preview"
                            style={{
                              width: "100px",
                              height: "auto",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      )}

                      {/* images */}
                      <div className="d-flex align-items-center justify-content-between">
                        <label>Images:</label>
                        <input
                          multiple
                          type="file"
                          onChange={handleImagesChange}
                          style={{ width: "250px" }}
                        />
                        <div className="error-message">
                          {errors.image && (
                            <p className="text-danger">{errors.image}</p>
                          )}
                        </div>
                      </div>
                      {currentImages.length > 0 && (
                        <div className="d-flex gap-2 flex-wrap mb-2 ">
                          {currentImages.map((img, idx) => (
                            <div key={idx} style={{ position: "relative" }}>
                              <img
                                src={`http://localhost:1000/uploads/products/${img}`}
                                alt={`Current ${idx}`}
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  border: "1px solid #ccc",
                                  borderRadius: "20px",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeCurrentImage(img)}
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  position: "absolute",
                                  top: -4,
                                  right: -2,
                                  background: "red",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "20px",
                                  height: "20px",
                                  cursor: "pointer",
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* control buttons */}

                <div className="d-flex justify-content-center align-items-center gap-4 p-1">
                  <Button size="small" type="submit" className=" px-5">
                    {edit ? "Update Product" : "Add Product"}
                  </Button>

                  <Button
                    type="button"
                    className="px-5"
                    data-bs-dismiss="modal"
                    size="small"
                    variant="close"
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

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Button from "../../../shared/controls/Button";
// import Input from "../../../shared/controls/Input";
// import ProductsTable from "./ProductsTable";
// import Modal from "bootstrap/js/dist/modal";
// import AuthServices from "../../services/auth";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [currentImages, setCurrentImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [edit, setEdit] = useState(false);

//   // ✔ react-hook-form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const categoryWatch = watch("categoriesId");

//   // ============================
//   // Fetch products + categories
//   // ============================
//   const fetchProducts = async () => {
//     try {
//       const res = await AuthServices.fetchProducts();
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await AuthServices.fetchCategories();
//         setCategories(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchProducts();
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (!categoryWatch) return;

//     const fetchSubCategories = async () => {
//       try {
//         const res = await AuthServices.fetchSubCategories(categoryWatch);
//         setSubCategories(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchSubCategories();
//   }, [categoryWatch]);

//   // ============================
//   // Image Handlers
//   // ============================
//   const handleMainImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//       setValue("image", file);
//     }
//   };

//   const handleImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages((prev) => [...prev, ...files]);
//   };

//   const removeExistingImage = (img) => {
//     setCurrentImages((prev) => prev.filter((i) => i !== img));
//   };

//   // ============================
//   // Submit (Create + Update)
//   // ============================
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       Object.keys(data).forEach((key) => {
//         if (key !== "image" && key !== "imageFiles") {
//           formData.append(key, data[key]);
//         }
//       });

//       // Main image
//       if (data.image instanceof File) {
//         formData.append("image", data.image);
//       } else if (edit && selectedProduct.image) {
//         formData.append("image", selectedProduct.image);
//       }

//       // New imageFiles
//       newImages.forEach((file) => {
//         formData.append("imageFiles", file);
//       });

//       // Removed old images
//       if (edit && selectedProduct?.imageFiles) {
//         const removedImages = selectedProduct.imageFiles.filter(
//           (img) => !currentImages.includes(img)
//         );

//         if (removedImages.length > 0) {
//           formData.append("removeImages", JSON.stringify(removedImages));
//         }
//       }

//       // CREATE
//       if (!edit) {
//         await AuthServices.createProduct(formData);
//         alert("Product created successfully!");
//       }

//       // UPDATE
//       if (edit) {
//         await AuthServices.updateProduct(selectedProduct._id, formData);
//         alert("Product updated successfully!");
//       }

//       closeModal();
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   // ============================
//   // Load product in modal
//   // ============================
//   const loadUpdates = (pro) => {
//     setEdit(true);
//     setSelectedProduct(pro);

//     reset(pro); // Loads data into react-form

//     setImagePreview(pro.image);
//     setCurrentImages(pro.imageFiles || []);
//     setNewImages([]);

//     displayModal();
//   };

//   // ============================
//   // Modal Helpers
//   // ============================
//   const displayModal = () => {
//     const myModal = new Modal(document.getElementById("myModal"));
//     myModal.show();
//   };

//   const closeModal = () => {
//     const modalEl = document.getElementById("myModal");
//     const modal = Modal.getInstance(modalEl);
//     modal.hide();
//   };

//   const resetForm = () => {
//     reset();
//     setImagePreview(null);
//     setCurrentImages([]);
//     setNewImages([]);
//     setEdit(false);
//   };

//   return (
//     <div>
//       <ProductsTable
//         products={products}
//         updateMethod={loadUpdates}
//         setEdit={setEdit}
//       />

//       <Button
//         type="button"
//         size="small"
//         onClick={() => {
//           resetForm();
//           displayModal();
//         }}
//       >
//         Add Product
//       </Button>

//       {/* MODAL */}
//       <div className="modal" id="myModal" data-bs-backdrop="static">
//         <div className="modal-dialog modal-xl modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-body">
//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="row">
//                   {/* LEFT SIDE */}
//                   <div className="col-6">
//                     {/* NAME */}
//                     <label>Name</label>
//                     <Input
//                       {...register("name", { required: "Name required" })}
//                       className="form-control"
//                     />
//                     {errors.name && (
//                       <p className="text-danger">{errors.name.message}</p>
//                     )}

//                     {/* CATEGORY */}
//                     <label>Category</label>
//                     <select
//                       {...register("categoriesId", {
//                         required: "Category required",
//                       })}
//                       className="form-select"
//                     >
//                       <option value="">Select</option>
//                       {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>

//                     {/* SIZE */}
//                     <label>Size</label>
//                     <Input
//                       {...register("size", { required: "Size required" })}
//                       className="form-control"
//                     />

//                     {/* PRODUCT TYPE */}
//                     <label>Product Type</label>
//                     <select
//                       {...register("productType")}
//                       className="form-select"
//                     >
//                       <option value="">Select</option>
//                       <option value="available">Available</option>
//                       <option value="best_selling">Best Selling</option>
//                       <option value="upcoming">Upcoming</option>
//                     </select>

//                     {/* DESCRIPTION */}
//                     <label>Description</label>
//                     <textarea
//                       {...register("description", {
//                         required: "Description required",
//                       })}
//                       className="form-control"
//                     />
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="col-6">
//                     {/* PRICE */}
//                     <label>Price</label>
//                     <Input
//                       {...register("price", { required: true })}
//                       className="form-control"
//                     />

//                     {/* SUB CATEGORY */}
//                     <label>Sub Category</label>
//                     <select
//                       {...register("subCategoriesId")}
//                       className="form-select"
//                     >
//                       <option value="">Select</option>
//                       {subCategories.map((s) => (
//                         <option key={s._id} value={s._id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>

//                     {/* COLOR */}
//                     <label>Color</label>
//                     <Input {...register("color")} className="form-control" />

//                     {/* STOCK */}
//                     <label>Stock</label>
//                     <Input
//                       {...register("stock", { required: true })}
//                       className="form-control"
//                     />

//                     {/* MAIN IMAGE */}
//                     <label>Main Image</label>
//                     <input type="file" onChange={handleMainImage} />

//                     {imagePreview && (
//                       <img
//                         src={`http://localhost:1000/uploads/products/${imagePreview}`}
//                         width="120"
//                       />
//                     )}

//                     {/* MULTIPLE IMAGES */}
//                     <label>Images</label>
//                     <input type="file" multiple onChange={handleImagesChange} />

//                     {/* Show existing images */}
//                     {currentImages.map((img, idx) => (
//                       <div
//                         key={idx}
//                         style={{
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         <img
//                           src={`http://localhost:1000/uploads/products/${img}`}
//                           width="100"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeExistingImage(img)}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-center gap-3 mt-3">
//                   <Button size="small" type="submit">
//                     {edit ? "Update" : "Create"}
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="close"
//                     onClick={() => {
//                       resetForm();
//                       closeModal();
//                     }}
//                   >
//                     Close
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
