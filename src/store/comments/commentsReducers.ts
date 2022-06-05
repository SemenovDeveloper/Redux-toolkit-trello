import { createReducer } from "@reduxjs/toolkit";
import { addComment } from "store/comments/commentsActions";
import { CommentType } from "types/types";

const initialState = {
  comments: []
}

const commentsReducer = createReducer(initialState, (builder) => {
  builder.addCase( addComment, (state, action) => {
    // state.comments.push(action.preload)
  })
})

export default commentsReducer