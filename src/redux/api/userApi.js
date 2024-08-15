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
      providesTags: ["Edit", "Likes", "Reposts", "Follow"],
    }),
    editProfile: builder.mutation({
      query: ({ profilePic, displayName, bio }) => {
        const formdata = new FormData();
        if (profilePic) {
          formdata.append("images", profilePic[0]);
        }
        formdata.append("displayName", displayName);
        formdata.append("bio", bio);

        return {
          url: "/edit",
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["Edit"],
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

export const {
  useFetchUserQuery,
  useEditProfileMutation,
  useToggleFollowUserMutation,
} = userApi;
