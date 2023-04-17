import { DataGrid } from "@mui/x-data-grid";
import "./userList.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers, resetMessU } from "../../redux/apiCalls";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.all);

  useEffect(()=>{
    getUsers(dispatch);
  }, [dispatch]);

  
  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  const resetMes = () =>{
    resetMessU(dispatch);
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (param) => {
        return (
          <div className="userListUser">
            <img src={param.row.img || "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="} alt="" className="userListImg" />
            {param.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 220 },
    { field: "isAdmin", headerName: "Admin", width: 130 },
    {
      field: "action",
      headerName: "Action",
      with: 150,
      renderCell: (param) => {
        return (
          <>
            <Link to={"/user/" + param.row._id}>
              <button className="userListEdit" onClick={resetMes}>Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => handleDelete(param.row._id)}
            />
          </>
        );
      },
    },
  ];

 
  return (
    <div className="userList">
      <div className="addNewButtonContainer">
        <h1>User List</h1>
        <Link to="/newUser">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
