import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "hooks";
import { renameColumn, addCard } from "store/ducks";
import { Cards } from "components";
import { ColumnType } from "types/types";
import { FlexContainer, Button, Form } from "ui";
import editIcon from "images/editIcon.svg";


interface ColumnProps {
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const [isColumnEditeble, setIsColumnEditeble] = useState<boolean>(false);

  const keyPressHandler = (cardName: string) => {
    if (cardName !== "") {
      let cardID: string = Date.now().toString();
      const newCard = {
        cardTitle: cardName,
        ID: cardID,
        columnID: column.ID,
        description: "",
      };
      dispatch(addCard(newCard));
    }
  };

  const submitColumnName = (columnName: string) => {
    dispatch(renameColumn({ ID: column.ID, columnTitle: columnName }));
    setIsColumnEditeble(false);
  };

  return (
    <StyledContainer>
      <div>
        <FlexContainer>
          <ColumnTitle>{column.columnTitle}</ColumnTitle>
          <Button
            img={editIcon}
            onClick={() => setIsColumnEditeble(!isColumnEditeble)}
          ></Button>
        </FlexContainer>
        {isColumnEditeble && (
          <Form
            onHandleClick={submitColumnName}
            placeholder="Enter Column Name"
            defaultValue={column.columnTitle}
            // onChange={(e) => setColumnName(e.target.value)}
          />
        )}
      </div>
      <Cards column={column} />
      <Form
        placeholder="Add a card"
        defaultValue={''}
        onHandleClick={keyPressHandler}
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
