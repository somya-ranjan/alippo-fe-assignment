import { createSlice } from "@reduxjs/toolkit";
import toaster from "../../../lib/toaster";

type userTypeOf = {
  name: string | null;
  age: string | number | null;
  city: string | null;
  pinCode: string | number | null;
};
const initialState = {
  isUserListLoading: false,
  userList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserListStart: (state) => {
      state.isUserListLoading = true;
    },
    getUserListSuccess: (state, { payload }) => {
      const searchRes = state?.userList?.filter((user: userTypeOf) => {
        return (
          user?.name?.toLowerCase().includes(payload?.search.toLowerCase()) ||
          user?.city?.toLowerCase().includes(payload?.search.toLowerCase())
        );
      });

      if (payload.search) {
        state.userList = searchRes;
      } else {
        state.userList =
          JSON.parse(localStorage.getItem("usersLists")!) || payload;
      }
      state.isUserListLoading = false;
    },
    getUserListFailed: (state) => {
      state.isUserListLoading = false;
      state.userList = [];
    },
    updateUser: (state, { payload }) => {
      state?.userList.forEach((user: userTypeOf) => {
        if (user?.name === payload?.prevVal) {
          user.name = payload.values.name;
          toaster.success("User updated successfully");
          localStorage.setItem("usersLists", JSON.stringify(state?.userList));
        }
      });
    },
    deleteUser: (state, { payload }) => {
      const res = state?.userList.filter((user: userTypeOf) => {
        return user?.name?.toLowerCase() !== payload.toLowerCase();
      });
      state.userList = res;
      toaster.success("User deleted successfully");
      localStorage.setItem("usersLists", JSON.stringify(state?.userList));
    },
  },
});

export const {
  getUserListStart,
  getUserListSuccess,
  getUserListFailed,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
