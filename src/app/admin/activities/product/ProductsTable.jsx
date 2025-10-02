import Button from "../../../shared/controls/Button";
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
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>

              <td>{product.categoriesId.name}</td>
              <td>{product.subCategoriesId.name}</td>
              <td>{product.price}</td>

              <td>
                <div className="d-flex gap-2">
                  <Button
                    className=""
                    size="small"
                    onClick={() => {
                      updateMethod(product);
                      setEdit(true);
                    }}
                  >
                    Update
                  </Button>

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
