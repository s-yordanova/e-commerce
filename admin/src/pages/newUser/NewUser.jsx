import "./newUser.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUsers } from "../../redux/apiCalls";

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    console.log(user);
    addUsers(user, dispatch);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="userFormLeft">
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="email@gmail.com"
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />

          <button onClick={handleClick} className="newUserButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
