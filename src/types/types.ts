export type CommentType = {
  ID: string
  comment: string
  taskID: string
}

export type TaskType = {
  taskTitle: string
  ID: string
  columnID: string
  description: string
}

export type ColumnType = {
  columnTitle: string
  ID: string
}