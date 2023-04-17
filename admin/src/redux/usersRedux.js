import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        all: [],
        isFetching: false,
        success: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.all = action.payload;
        },
        getUsersFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //DELETE
        deleteUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.all.splice(state.all.findIndex((item) => item._id === action.payload), 1);
        },
        deleteUserstFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //UPDATE
        updateUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.success =  false;
        },
        updateUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.success =  true;
            state.all[state.all.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.getUsers;
        },
        updateUsersFail: (state) => {
            state.isFetching = false;
            state.error = true;
            state.success =  false;
        },

        resetMessageUsers: (state) => {
            state.success= false;
            state.error = false;
        },

        //ADD
        addUsersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUsersSuccess: (state, action) => {
            state.isFetching = false;
            state.all.push(action.payload);
        },
        addUsersFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
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
} = usersSlice.actions;
export default usersSlice.reducer;