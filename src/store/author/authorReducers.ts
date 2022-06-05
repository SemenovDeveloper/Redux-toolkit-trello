import { createReducer } from "@reduxjs/toolkit";
import { addName } from "store/author/authorActions";

const initialState = {
  author:'user'
}

export const authorNamaReducer = createReducer(initialState, (builder) => {
  // builder.addCase(addName, (state, action) => {
  //   state.author= action.payload.author
  // })
})