import { createReducer } from "@reduxjs/toolkit";
import { CommentType } from "types/types";
import {
  addComment,
  deleteComment,
  editComment,
} from "store/ducks/comment/commentActions";

const initialState: CommentType[] = [];

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addComment, (state, action) => {
      state.push(action.payload);
    })
    .addCase(editComment, (state, action) => {
      return state.map((comment) => {
        if (comment.ID === action.payload.ID) {
          return { ...comment, comment: action.payload.newComment };
        }
        return comment;
      });
    })
    .addCase(deleteComment, (state, action) => {
      return state.filter((comment) => comment.ID !== action.payload);
    });
});
