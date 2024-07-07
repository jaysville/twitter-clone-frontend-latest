import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/user`,
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({ query: (userId) => `/${userId}` }),
    fetchUserPosts: builder.query({
      query: (userId) => `/${userId}/posts`,
    }),
  }),
});

export const { useFetchUserQuery, useFetchUserPostsQuery } = userApi;
