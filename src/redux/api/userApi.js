import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
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
    fetchRecommendedUsers: builder.query({
      query: () => "/recommended",
    }),
    fetchFollowers: builder.query({
      query: (userId) => `/${userId}/followers`,
    }),
    fetchFollowing: builder.query({
      query: (userId) => `/${userId}/following`,
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
      invalidatesTags: ["Edit", "Post"],
    }),
    toggleFollowUser: builder.mutation({
      query: (userToFollowId) => ({
        url: `/follow/${userToFollowId}`,
        method: "Put",
      }),
      invalidatesTags: ["Follow", "Notification"],
    }),
    fetchNotifications: builder.query({
      query: () => "/notifications",
      providesTags: ["Notification"],
    }),
    viewNotifications: builder.mutation({
      query: (unviewedNotifs) => ({
        url: "/notifications",
        method: "Put",
        body: unviewedNotifs,
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchRecommendedUsersQuery,
  useFetchFollowersQuery,
  useFetchFollowingQuery,
  useEditProfileMutation,
  useToggleFollowUserMutation,
  useFetchNotificationsQuery,
  useViewNotificationsMutation,
} = userApi;
