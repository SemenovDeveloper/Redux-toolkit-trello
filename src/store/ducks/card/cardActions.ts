import { createAction } from "@reduxjs/toolkit";
import { CardType } from "types/types";

interface IrenameCard {
  ID: string;
  newTitle: string;
}

interface IeditDescriotion {
  ID: string;
  desription: string;
}


export const addCard = createAction<CardType>("addCard");
export const editCard = createAction<CardType>('editCard')
export const deleteCard = createAction<string>("deleteCard");
