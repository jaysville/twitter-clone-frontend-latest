import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Likes", "Reposts", "Follow"],
    }),
    toggleFollowUser: builder.mutation({
      query: (userToFollowId) => ({
        url: `/follow/${userToFollowId}`,
        method: "Put",
      }),
      invalidatesTags: ["Follow"],
    }),
  }),
});

export const { useFetchUserQuery, useToggleFollowUserMutation } = userApi;
