import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://mobilemother.hapeyeapp.com/api",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.data?.statusCode === 401 ||
    result?.error?.data?.statusCode === 404
  ) {
    api.dispatch(logOut());
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiSlice;

