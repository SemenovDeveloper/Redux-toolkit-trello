import { createAction } from "@reduxjs/toolkit";
import { CommentType } from "types/types";

interface IeditComment {
  ID: string;
  newComment: string;
}

export const addComment = createAction<CommentType>("addComment");
export const editComment = createAction<IeditComment>("editComment");
export const deleteComment = createAction<string>("deleteComment");
