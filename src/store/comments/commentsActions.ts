import { createAction } from "@reduxjs/toolkit";

export const addComment = createAction('addComment');
export const removeComment = createAction('removeComment');
export const editComment = createAction('editComment');