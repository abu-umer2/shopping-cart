import Button from "../../../shared/controls/Button";
const CategoriesTable = ({ categories, updateMethod, setEdit }) => {
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            <th>Category Name</th>
            <th>Sub-categories</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr>
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
                <div className="d-flex gap-2">
                  <Button className="" size="small">
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
