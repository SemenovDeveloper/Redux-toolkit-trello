import { TaskCard } from "components/TaskCard";
import { ColumnType, TaskType, CommentType } from "types/types";
import { useAppSelector } from 'hooks/redux'

interface CardProps {
  columnData: ColumnType;
}

export const Cards: React.FC<CardProps> = ({
  columnData,
}) => {
  const tasksList = useAppSelector(state => state.taskReducer)
  const filteredTasks = tasksList.filter((task) => task.columnID === columnData.ID)

  return (
    <div>
      {filteredTasks.map((task) => {
        return (
          <TaskCard
            key={task.ID}
            task={task}
          />
        );
      })}
    </div>
  );
};
