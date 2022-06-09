import { createReducer } from "@reduxjs/toolkit";
import { inputAuthor } from "./authorActions";

const initialState: string = "user";

export const authorReducer = createReducer(initialState, (builder) => {
  builder.addCase(inputAuthor, (state, action) => {
    return action.payload;
  });
});
