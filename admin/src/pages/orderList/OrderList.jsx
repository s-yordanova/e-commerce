import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./orderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`orders/`);
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"orderStatusButton " + type}>{type}</button>;
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    { field: "createdAt", headerName: "Date", width: 220 },
    { field: "amount", header: "Amount", width: 160 },
    { field: "paid", header: "Is Paid", width: 160 },
    {
      field: "status",
      headre: "Status",
      width: 120,
      renderCell: (param) => {
        return (
          <div className="statusButton">
            <Button type={param.row.status} />
          </div>
        );
      },
    },
    {
        field: "action",
        headre: "Action",
        width: 100,
        renderCell: (param) => {
          return (
            <>
                <Link to={"/order/" + param.row._id}>
                  <button className="orderListView">View</button>
                </Link>
              </>
          );
        },
      },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  );
};

export default OrderList;
