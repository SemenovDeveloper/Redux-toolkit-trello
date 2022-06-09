import { createReducer } from "@reduxjs/toolkit";
import { CardType } from "types/types";
import {
  addCard,
  deleteCard,
  editCard
} from "./cardActions";

const initialState: CardType[] = [];

export const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCard, (state, action) => {
      state.push(action.payload);
    })
    .addCase(editCard, (state, action) => {
      return state.map((card) => {
        if (card.ID === action.payload.ID) {
          return action.payload;
        }
        return card;
      });
    })
    .addCase(deleteCard, (state, action) => {
      return state.filter((card) => card.ID !== action.payload);
    })
});
