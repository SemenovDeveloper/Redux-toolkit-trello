import { configureStore } from "@reduxjs/toolkit";
import { authorNamaReducer } from 'store/author/authorReducers'

export const store = configureStore({
  reducer: {author: authorNamaReducer}
})