import { createReducer } from "@reduxjs/toolkit";
import { TaskType } from "types/types";
import { addTask, renameTask, deleteTask, editDescription, deleteDescription } from "./cardActions";


const initialState: TaskType[] = [{
  taskTitle: 'read',
  ID: '1234564785953',
  columnID: "95891ca7-f3c7-4070-a0cf-3c9aaa9f4c85",
  description: 'dupudu'
}];

export const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTask, (state, action) => {
      state.push(action.payload)
    })
    .addCase(renameTask, (state, action) => {
      return state.map(task => {
        if(task.ID === action.payload.ID){
          return {...task, taskTitle: action.payload.newTitle}
        }
        return task
      })
    })
    .addCase(deleteTask, (state, action) => {
      return state.filter(task => task.ID !== action.payload)
    })
    .addCase(editDescription, (state, action) => {
      return state.map(task => {
        if(task.ID === action.payload.ID){
          return {...task, description: action.payload.desription}
        }
        return task
      })
    })
    .addCase(deleteDescription, (state, action) => {
      return state.map(task => {
        if(task.ID === action.payload){
          return {...task, description: ''}
        }
        return task
      })
    })
}
)
