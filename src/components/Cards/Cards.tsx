import { useMemo } from "react";
import { TaskCard } from "components/TaskCard";
import { ColumnType, TaskType, CommentType } from "types/types";
import { useAppSelector } from 'hooks/redux'

interface CardProps {
  columnData: ColumnType;
  tasks: TaskType[];
  comments: CommentType[];
  author: string;
  editDescription: (description: string, taskID: string) => void;
  addComment: (comment: string, taskID: string) => void;
  deleteComment: (commentID: string) => void;
  editComment: (commentID: string, commentText: string) => void;
  deleteTask: (taskID: string) => void;
  renameTask: (newTitle: string, taskID: string) => void;
}

export const Cards: React.FC<CardProps> = ({
  columnData,
  tasks,
  comments,
  author,
  editDescription,
  addComment,
  deleteComment,
  editComment,
  deleteTask,
  renameTask,
}) => {
  const tasksList = useAppSelector(state => state.taskReducer)
  const filteredTasks = tasksList.filter((task) => task.columnID === columnData.ID)

  return (
    <div>
      {filteredTasks.map((task) => {
        return (
          <TaskCard
            key={task.ID}
            author={author}
            task={task}
            columnData={columnData}
            comments={comments}
            addComment={addComment}
            editDescription={editDescription}
            deleteComment={deleteComment}
            editComment={editComment}
            // deleteTask={deleteTask}
            // renameTask={renameTask}
          />
        );
      })}
    </div>
  );
};
