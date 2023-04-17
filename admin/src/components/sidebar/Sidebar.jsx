import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";



function Sidebar() {
  const [active, setActive] = useState("home");

  const handleClick = event => {
      const elem = document.getElementById(active);
     elem.classList.remove('active');
      event.currentTarget.classList.add('active');
       setActive(event.currentTarget.id);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Dashboard </h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li id = "home" onClick={handleClick} className="sidebarListItem active" >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li  id = "analytics"  onClick={handleClick} className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li  id = "sales" onClick={handleClick} className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li id = "users" onClick={handleClick} className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li id = "products"  onClick={handleClick} className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li id = "orders" onClick={handleClick} className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Orders
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
