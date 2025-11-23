import Button from "../../../shared/controls/Button";
const SubCategoriesTable = ({ subCategories, updateMethod, setEdit }) => {
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Categories</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((sub) => (
            <tr key={sub._id}>
              <td>{sub._id}</td>
              <td>{sub.name}</td>
              <td>{sub.categoryId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategoriesTable;
