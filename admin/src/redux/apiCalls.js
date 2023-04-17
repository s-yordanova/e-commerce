import { loginStart, loginFail, loginSuccess, logout } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  deleteProductFail,
  deleteProductStart,
  deleteProductSuccess,
  getProductFail,
  getProductStart,
  getProductSuccess,
  updateProductFail,
  updateProductStart,
  updateProductSuccess,
  addProductFail,
  addProductStart,
  addProductSuccess,
  resetMessage
} from "./productRedux";
import {
  getUsersStart,
  getUsersSuccess,
  getUsersFail,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFail,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFail,
  addUsersStart,
  addUsersSuccess,
  addUsersFail,
  resetMessageUsers,
} from "./usersRedux"


//LOGIN

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if(!res.data.isAdmin){
      dispatch(loginFail());
    }else{
    dispatch(loginSuccess(res.data));}
  } catch (err) {
    dispatch(loginFail());
  }
};

//LOGOUT

export const logoutUser = async (dispatch) => {
  dispatch(logout());
};

//PRODUCTS

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/all");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFail());
  }
};

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    //const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFail());
  }
};

export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id: id, product: product }));
  } catch (err) {
    dispatch(updateProductFail());
  }
};

export const resetMessU = async (dispatch) => {
  dispatch(resetMessageUsers());
};

export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFail());
  }
};

//USERS

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFail());
  }
};


export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    //const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUsersSuccess(id));
  } catch (err) {
    dispatch(deleteUsersFail());
  }
};

export const resetMess = async (dispatch) => {
  dispatch(resetMessage());
};

export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    //dispatch(updateUsersSuccess({ id: id, user: user }));
    dispatch(updateUsersSuccess(res.data));
  } catch (err) {
    dispatch(updateUsersFail());
  }
};

export const addUsers = async (user, dispatch) => {
  dispatch(addUsersStart());
  try {
    const res = await publicRequest.post(`/auth/register`, user);
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    dispatch(addUsersFail());
  }
};