import { createReducer } from "@reduxjs/toolkit";
import { CommentType } from "types/types";
import { addComment, deleteComment, editComment } from "store/ducks/comment/commentActions";


const initialState: CommentType[] = [
];

export const commentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addComment, (state, action) => {
      state.push(action.payload)      
    })
    .addCase(editComment, (state, action) => {
      return state.map( comment => {
        if(comment.ID === action.payload.ID) {
          return {...comment, comment: action.payload.newComment}
        }
        return comment
      })
    })
    .addCase(deleteComment, (state, action) => {
      return state.filter(comment => comment.ID !== action.payload)
    })
    // .addCase(renameTask, (state, action) => {
    //   return state.map(task => {
    //     if(task.ID === action.payload.ID){
    //       return {...task, taskTitle: action.payload.newTitle}
    //     }
    //     return task
    //   })
    // })
    // .addCase(deleteTask, (state, action) => {
    //   return state.filter(task => task.ID !== action.payload)
    // })
    // .addCase(editDescription, (state, action) => {
    //   return state.map(task => {
    //     if(task.ID === action.payload.ID){
    //       return {...task, description: action.payload.desription}
    //     }
    //     return task
    //   })
    // })
    // .addCase(deleteDescription, (state, action) => {
    //   return state.map(task => {
    //     if(task.ID === action.payload){
    //       return {...task, description: ''}
    //     }
    //     return task
    //   })
    // })
}
)
