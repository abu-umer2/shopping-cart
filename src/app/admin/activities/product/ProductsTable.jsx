const ProductsTable = ({ products, updateMethod, setEdit }) => {
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Product Sub-category</th>
            <th>Product Price</th>

            <th>Product Action</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>
                {product.categoriesId
                  ? product.categoriesId?.name
                  : "No Category"}
              </td>
              <td>
                {product.subCategoriesId
                  ? product.subCategoriesId?.name
                  : "No Subcategory"}
              </td>
              <td>{product.price}</td>

              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      updateMethod(product);
                      setEdit(true);
                    }}
                  >
                    Update
                  </button>
                </div>
              </td>
              <td>
                <div className="d-flex gap-2">
                  <div>
                    <img
                      src={product.image || null}
                      alt="Preview"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
