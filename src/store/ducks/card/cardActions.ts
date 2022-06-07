import { createAction } from "@reduxjs/toolkit";
import { TaskType } from "types/types";

interface IrenameTask {
  ID: string;
  newTitle: string;
}

interface IeditDescriotion {
  ID: string;
  desription: string;
}

export const addTask = createAction<TaskType>("addTask");
export const renameTask = createAction<IrenameTask>("renameTask");
export const deleteTask = createAction<string>("deleteTask");
export const editDescription =
  createAction<IeditDescriotion>("editDescription");
export const deleteDescription = createAction<string>("deleteDescription");
