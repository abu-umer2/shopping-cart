import Button from "../../../shared/controls/Button";
const CategoriesTable = ({ categories, onEdit }) => {
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            <th>Category Name</th>
            <th>Sub-categories</th>
            <th>image</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.name}</td>
              <td>
                {cat.subCategories.length > 0 ? (
                  <ul>
                    {cat.subCategories.map((sub) => (
                      <li key={sub._id}>{sub.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>no categories found</span>
                )}
              </td>
              <td>
                <img
                  src={`http://localhost:1000/uploads/categories/${cat.image}`}
                  alt=""
                  width={100}
                  height={100}
                />
              </td>

              <td>
                <div className="d-flex gap-2">
                  <Button className="" size="small" onClick={() => onEdit(cat)}>
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

export default CategoriesTable;
