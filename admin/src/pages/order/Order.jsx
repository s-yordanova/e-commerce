import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import "./order.css";

const Order = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [order, setOrder] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`orders/take/id/${orderId}`);
        setOrder(res.data);
      } catch {}
    };
    getOrders();
  }, [orderId]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        order.products.map(async (item) => {
          let res = await userRequest.get(`products/find/${item.productId}`);
          setOrderedProducts((oldArray) => [
            ...oldArray,
            {
              ...res.data,
              quantity: item.quantity,
              size: item.size,
              color: item.color,
            },
          ]);
        });
      } catch {}
    };
    orderedProducts.length <= 0 && getProducts();
  }, [order, orderedProducts]);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "title",
      headerName: "Title",
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
    { field: "size", header: "Size", width: 160 },
    { field: "color", header: "Color", width: 160 },
    { field: "quantity", header: "Quantity", width: 160 },
  ];

  const handleClick = async (e) => {
    e.preventDefault();
    if (status) {
      try {
        const res = await userRequest.put(`/orders/${orderId}`, {
          status: status,
        });
        if (res.status === 200) {
          setSuccess(true);
          setError(false);
        }
      } catch (e) {
        setSuccess(false);
        setError(true);
      }
    }
  };

  console.log(order)

  return (
    <div className="orderContainer">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">View Order {orderId}</h1>
      </div>
      <div className="view">
        <div className="orderViewContainer">
          <div className="infoContainer">
            <label>User ID: </label>
            <span>{order.userId}</span>
          </div>
          <div className="infoContainer">
            <label>Full Name: </label>
            <span>{order.fullName}</span>
          </div>
          <div className="infoContainer">
            <label>Phone: </label>
            <span>{order.phone}</span>
          </div>
          <div className="infoContainer">
            <label>Address: </label>
            <span>{order.paid ? order.address.country : order.address}</span>
          </div>
          <div className="infoContainer">
            <label>Amount:</label>
            <span>{order.amount} BGN</span>
          </div>
          <div className="infoContainer">
            <label>Is Paid:</label>
            <span>{order.paid ? "Yes" : "No"}</span>
          </div>

          <form action="">
            <div className="infoContainer">
              <label>Status: </label>
              <select
                defaultValue={order.status}
                key={order.status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="pending">pending</option>
                <option value="declined">declined</option>
                <option value="approved">approved</option>
              </select>
            </div>
            <div className="infoContainer">
              <button className="updateOrder" onClick={handleClick}>
                Update Status
              </button>
              {success && <p className="success">Успешно обновяване!</p>}
              {error && <p className="error">Неуспешно обновяване!</p>}
            </div>
          </form>
        </div>
        <div className="productsInfo">
          <DataGrid
            rows={orderedProducts}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
