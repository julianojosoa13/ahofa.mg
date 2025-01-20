import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchPostsFromFirebase } from "../../api/posts"; // Example API call

// Async Thunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  // const posts = await fetchPostsFromFirebase();
  const posts = null;
  return posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
