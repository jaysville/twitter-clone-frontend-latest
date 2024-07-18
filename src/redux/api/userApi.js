import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/user`,
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Likes", "Reposts"],
    }),
  }),
});

export const { useFetchUserQuery } = userApi;
