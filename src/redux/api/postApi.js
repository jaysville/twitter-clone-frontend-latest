import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,

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
    fetchFollowingPosts: builder.query({
      query: () => "/following",
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: (postId) => `/${postId}`,
      providesTags: ["Likes", "Comment", "Reposts", "Post"],
    }),
    fetchUserPosts: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: ["Likes", "Reposts", "Post", "Edit"],
    }),
    fetchUserReposts: builder.query({
      query: (userId) => `/user/${userId}/reposts`,
      providesTags: ["Comment", "Likes", "Post", "Edit", "Reposts"],
    }),
    fetchUserReplies: builder.query({
      query: (userId) => `/user/${userId}/replies`,
      providesTags: ["Comment", "Likes", "Post", "Edit", "Reposts"],
    }),
    fetchUserLikes: builder.query({
      query: (userId) => `/user/${userId}/likes`,
      providesTags: ["Comment", "Likes", "Post", "Edit", "Reposts"],
    }),
    createPost: builder.mutation({
      query: ({ content, images }) => {
        const formData = new FormData();
        formData.append("content", content);
        if (images) {
          for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
          }
        }
        return {
          url: "/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: ({ postId, content, imagesToDelete, newImages }) => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("imagesToDelete", imagesToDelete);
        if (newImages) {
          for (let i = 0; i < newImages.length; i++) {
            formData.append("images", newImages[i]);
          }
        }
        return { url: `/edit/${postId}`, method: "Post", body: formData };
      },
      invalidatesTags: ["Post", "Comment"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/delete/${postId}`,
        method: "Delete",
      }),
      invalidatesTags: ["Post", "Comment", "Reposts", "Likes"],
    }),
    getComments: builder.query({
      query: (postId) => `/${postId}/comments`,
      providesTags: ["Comment", "Likes", "Reposts", "Post"],
    }),
    commentOnPost: builder.mutation({
      query: (body) => ({
        url: `/comment/${body.postId}`,
        method: "POST",
        body: { content: body.content },
      }),
      invalidatesTags: ["Comment", "Post", "Notification"],
    }),
    toggleLikePost: builder.mutation({
      query: (postId) => ({ url: `/likes/${postId}`, method: "Put" }),
      invalidatesTags: ["Likes", "Posts", "Notification"],
    }),
    toggleRepost: builder.mutation({
      query: (postId) => ({
        url: `/reposts/${postId}`,
        method: "Put",
      }),
      invalidatesTags: ["Reposts", "Notification"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useFetchFollowingPostsQuery,
  useFetchUserPostsQuery,
  useFetchUserRepostsQuery,
  useFetchUserRepliesQuery,
  useFetchUserLikesQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetSinglePostQuery,
  useGetCommentsQuery,
  useCommentOnPostMutation,
  useToggleLikePostMutation,
  useToggleRepostMutation,
} = postApi;
