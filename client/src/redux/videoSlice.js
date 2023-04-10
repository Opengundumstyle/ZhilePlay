import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  currentComments:null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
      state.error=false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
   fetchComments:(state,action)=>{
    state.loading = false;
    state.currentComments = action.payload;
   },
   addComment:(state,action)=>{
     const newComment = action.payload;
     state.currentComments = [newComment,...state.currentComments]
   },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure,like,dislike,fetchComments,addComment} =
  videoSlice.actions;

export default videoSlice.reducer;