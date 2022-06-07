import React, { useState } from "react";
import styled from "styled-components";
import { Cards } from "components/Cards";
import { ColumnType } from "types/types";
import { StyledInput } from "ui/StyledInput";
import { FlexContainer } from "ui/FlexContainer";
import { Button } from "ui/Button/Button";
import editIcon from "images/editIcon.svg";
import { Form } from 'ui/Form'
import { useAppDispatch } from 'hooks/redux';
import { renameColumn} from 'store/ducks/column/columnActions'
import { addTask } from 'store/ducks/card/cardActions'

interface ColumnProps {
  columnData: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({
  columnData,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isColumnEditeble, setIsColumnEditeble] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");

  const dispatch = useAppDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && taskTitle !== "") {
      let taskID: string = Date.now().toString();
      const newTask = {
        taskTitle: taskTitle,
        ID: taskID,
        columnID: columnData.ID,
        description: "",
      };
      dispatch(addTask(newTask))
      setTaskTitle("");
    }
  };

  const changeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  };

  const submitColumnName = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(renameColumn({ID: columnData.ID, columnTitle: columnName}))
    setIsColumnEditeble(false);
  };

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
          <Form
            onHandleClick={submitColumnName} 
            placeholder="Enter Column Name"
            value={columnData.columnTitle}
            onChange={changeColumnName}
          />
        )}
      </div>
      <Cards
        columnData={columnData}
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
