import React, { useState } from "react";
import styled from "styled-components";
import { Cards } from "components/Cards";
import { ColumnType, TaskType, CommentType } from "types/types";
import { StyledInput } from "ui/StyledInput";
import { FlexContainer } from "ui/FlexContainer";
import { Button } from "ui/Button/Button";
import editIcon from "images/editIcon.svg";
import { Form } from 'ui/Form'
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { deleteColumn } from "store/Column/columnReducers";
import { renameColumn} from 'store/Column/columnReducers'

interface ColumnProps {
  columnID: string
  columnData: ColumnType;
  author: string;
  tasks: TaskType[];
  comments: CommentType[];
  // renameColumn: (newName: string, columnID: string) => void;
  addTask: (taskTitle: string, columnID: string) => void;
  addComment: (comment: string, taskID: string) => void;
  deleteComment: (commentID: string) => void;
  editDescription: (description: string, taskID: string) => void;
  editComment: (commentID: string, commentText: string) => void;
  deleteTask: (taskID: string) => void;
  renameTask: (newTitle: string, taskID: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  columnID,
  columnData,
  author,
  tasks,
  comments,
  addTask,
  editDescription,
  addComment,
  deleteComment,
  editComment,
  deleteTask,
  renameTask
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isColumnEditeble, setIsColumnEditeble] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");

  // const {} = useAppSelector(state => state.columnReducer)
  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && taskTitle !== "") {
      addTask(taskTitle, columnData.ID);
      setTaskTitle("");
    }
  };

  const changeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  //////////////////////////////////////////////////////////////////////////

  const submitColumnName = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(renameColumn({ID: columnID, columnTitle: columnName}))
    setIsColumnEditeble(false);
  };

  const deleteColumnHandler = (columnID: string) => {
    dispatch(deleteColumn(columnID))
  }

  return (
    <StyledContainer>
      <div>
        <FlexContainer>
          <ColumnTitle>{columnData.columnTitle}</ColumnTitle>
          <Button
            img={editIcon}
            onClick={() => setIsColumnEditeble(!isColumnEditeble)}
          ></Button>
        </FlexContainer>
        {isColumnEditeble && (
          // <form onSubmit={submitColumnName}>
          //   <input 
          //     type="text" 
          //     name='column-title'
          //     onChange={changeColumnName}
          //     defaultValue={columnData.columnTitle}
          //   />
          //   <button type="submit">save</button>
          // </form>
          <Form
            onHandleClick={submitColumnName} 
            placeholder="Enter Column Name"
            value={columnData.columnTitle}
            onChange={changeColumnName}
          />
        )}
        <button onClick={() => deleteColumnHandler(columnID)}>del</button> 
      </div>
      <Cards
        columnData={columnData}
        tasks={tasks}
        comments={comments}
        author={author}
        editDescription={editDescription}
        addComment={addComment}
        deleteComment={deleteComment}
        editComment={editComment}
        deleteTask={deleteTask}
        renameTask={renameTask}
      />
      <StyledInput
        placeholder="Add a card"
        value={taskTitle}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-width: 230px;
  height: max-content;
  margin-left: 15px;
  background-color: #ebecf0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
`;

const ColumnTitle = styled.h3`
  margin: 10px 0;
  min-width: 150px;
  word-wrap: break-word;
`;
