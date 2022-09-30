import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: {},
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action) => {
        state.users = action.payload;
    },
    deleteUser: (state, action) => {
        state.users= state.users.filter((item) => item.id !== action.payload)
    },

    addUser: (state, action) => {
        state.users= [...state, ...action.payload]
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(tutorial => tutorial.id === action.payload.id);
      state.users[index] = {
        ...state.users[index],
        ...action.payload,
      };
    },
    getSingleUser: (state, action) => {
        state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsers, deleteUser, addUser, updateUser, getSingleUser } = userSlice.actions;
export const selectAllUsers = state => state?.data.users;

export default userSlice.reducer;
