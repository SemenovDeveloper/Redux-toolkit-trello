import { createReducer, createAction } from "@reduxjs/toolkit";
import { ColumnType } from "types/types";


const initialState: ColumnType[] = [
    { columnTitle: "TODO", ID: "d1865587-25e9-4e5e-aba1-11b9c8972b39" },
    { columnTitle: "In Progress", ID: "3218877d-e1f9-44f0-8872-ee2a440777b4" },
    { columnTitle: "Testing", ID: "95891ca7-f3c7-4070-a0cf-3c9aaa9f4c85" },
    { columnTitle: "Done", ID: "c4dce2ab-68f4-4fb5-8a65-1d0a18982711" },
  ]
  ;

export const renameColumn = createAction<ColumnType>('renameColumn');
export const deleteColumn = createAction<string>('deleteColumn');

export const columnReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(renameColumn, (state, action) => {
      state.map(column => {
          if (column.ID === action.payload.ID) {
            return { ...column, ...action.payload }
          }
          return state
      })
  })
    .addCase(deleteColumn, (state, action) => {
      state.filter(column => column.ID !== action.payload)
    })
}
)


