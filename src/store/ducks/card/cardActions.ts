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
export const renameCard = createAction<IrenameCard>("renameCard");
export const deleteCard = createAction<string>("deleteCard");
export const editDescription =
  createAction<IeditDescriotion>("editDescription");
export const deleteDescription = createAction<string>("deleteDescription");
