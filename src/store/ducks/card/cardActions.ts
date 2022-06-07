import { createAction } from "@reduxjs/toolkit";
import { TaskType } from "types/types";

export const addTask = createAction<TaskType>('addTask');
export const renameTask = createAction<TaskType>('renameTask');
export const deleteTask = createAction<string>('deleteTask');