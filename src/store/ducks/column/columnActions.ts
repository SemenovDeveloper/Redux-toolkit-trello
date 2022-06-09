import { createAction } from "@reduxjs/toolkit";
import { ColumnType } from "types/types";

export const renameColumn = createAction<ColumnType>('renameColumn');
