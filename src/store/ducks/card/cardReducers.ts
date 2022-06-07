import { createReducer } from "@reduxjs/toolkit";
import { TaskType } from "types/types";
import { addTask, renameTask, deleteTask } from "./cardActions";


const initialState: TaskType[] = [{
  taskTitle: 'read',
  ID: '1234564785953',
  columnID: "95891ca7-f3c7-4070-a0cf-3c9aaa9f4c85",
  description: 'dupudu'
}];

export const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(renameTask, (state, action) => {
      return state.map(task => {
        if(task.ID === action.payload.ID) {
          return { ...task, ...action.payload }
        } else {
          return task
        }
      })
  })
    // .addCase(deleteColumn, (state, action) => {
    //   return state.filter(column => column.ID !== action.payload)
    // })
}
)
