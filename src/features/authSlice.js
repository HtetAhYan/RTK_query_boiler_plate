import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  token,
};

const authSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log(action);
        if (action.payload.token) {
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      }
    );
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
