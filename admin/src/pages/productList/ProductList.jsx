import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteProducts, getProducts, resetMess } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
  };

  const resetMes = () => {
    resetMess(dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 220,
      renderCell: (param) => {
        return (
          <div className="productListProduct">
            <img src={param.row.img} alt="" className="productListImg" />
            {param.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 160 },
    { field: "onSale", headerName: "On Sale", width: 160 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "action",
      headerName: "Action",
      with: 150,
      renderCell: (param) => {
        return (
          <>
            <Link to={"/product/" + param.row._id}>
              <button className="productListEdit" onClick={resetMes}>
                Edit
              </button>
            </Link>
            <DeleteOutlineIcon
              className="productListDelete"
              onClick={() => handleDelete(param.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="addNewButtonContainer">
        <h1>Products List</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default ProductList;
