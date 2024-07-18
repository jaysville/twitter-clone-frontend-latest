import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/posts`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => "/",
      providesTags: ["Post", "Likes", "Reposts"],
    }),
    getSinglePost: builder.query({
      query: (postId) => `/${postId}`,
      providesTags: ["Likes", "Comment", "Reposts"],
    }),
    fetchUserPosts: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: ["Likes", "Reposts", "Post"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Post"],
    }),
    getComments: builder.query({
      query: (postId) => `/${postId}/comments`,
      providesTags: ["Comment", "Likes", "Reposts"],
    }),
    commentOnPost: builder.mutation({
      query: (body) => ({
        url: `/comment/${body.postId}`,
        method: "POST",
        body: { content: body.content },
      }),
      invalidatesTags: ["Comment"],
    }),
    toggleLikePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}`, method: "Put" }),
      invalidatesTags: ["Likes"],
    }),
    toggleRepost: builder.mutation({
      query: (postId) => ({
        url: `/reposts/${postId}`,
        method: "Put",
      }),
      invalidatesTags: ["Reposts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useFetchUserPostsQuery,
  useCreatePostMutation,
  useGetSinglePostQuery,
  useGetCommentsQuery,
  useCommentOnPostMutation,
  useToggleLikePostMutation,
  useToggleRepostMutation,
} = postApi;
