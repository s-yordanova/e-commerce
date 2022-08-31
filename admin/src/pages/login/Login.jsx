import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="loginContainer">
      <div className="formWrapper">
          <h1 className="title">Login to ArcherAdmin</h1>
          <form className="formStyle">
            <input
              className="inputLogin"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="inputLogin"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="loginButton" onClick={handleClick}>Login</button>
            {error && <span className="error">Нещо се обърка..</span>}
          </form>
      </div>
    </div>
  );
};

export default Login;
