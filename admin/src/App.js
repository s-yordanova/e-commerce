import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import Login from "./pages/login/Login";
import { Layout } from "./components/layout/Layout";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const admin = currentUser?.isAdmin;

  return (
    <Router>
      
      <Routes>
        { admin && (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/user/:userId' element={<User />} />
              <Route path='/newUser' element={<NewUser />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/newProduct' element={<NewProduct />} />
              <Route path="/orders" element = {<OrderList/>} />
              <Route path="/order/:orderId" element = {<Order/>} />
            </Route>
          </>
        )}
        <Route path="/login" element={admin? <Navigate to = "/"/> : <Login/>}/>
       {!admin && <Route path="/" element={<Navigate to="/login" />}> </Route>}
      </Routes>

    </Router>
  );
}

export default App;
