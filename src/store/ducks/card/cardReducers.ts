import { createReducer } from "@reduxjs/toolkit";
import { CardType } from "types/types";
import {
  addCard,
  renameCard,
  deleteCard,
  editDescription,
  deleteDescription,
} from "./cardActions";

const initialState: CardType[] = [];

export const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCard, (state, action) => {
      state.push(action.payload);
    })
    .addCase(renameCard, (state, action) => {
      return state.map((card) => {
        if (card.ID === action.payload.ID) {
          return { ...card, cardTitle: action.payload.newTitle };
        }
        return card;
      });
    })
    .addCase(deleteCard, (state, action) => {
      return state.filter((card) => card.ID !== action.payload);
    })
    .addCase(editDescription, (state, action) => {
      return state.map((card) => {
        if (card.ID === action.payload.ID) {
          return { ...card, description: action.payload.desription };
        }
        return card;
      });
    })
    .addCase(deleteDescription, (state, action) => {
      return state.map((card) => {
        if (card.ID === action.payload) {
          return { ...card, description: "" };
        }
        return card;
      });
    });
});
