import React, { useState } from "react";
import styled from "styled-components";
import { Cards } from "components/CardsBoard/CardsBoard";
import { ColumnType } from "types/types";
import { StyledInput } from "ui/StyledInput";
import { FlexContainer } from "ui/FlexContainer";
import { Button } from "ui/Button/Button";
import editIcon from "images/editIcon.svg";
import { Form } from "ui/Form";
import { useAppDispatch } from "hooks/redux";
import { renameColumn } from "store/ducks/column/columnActions";
import { addCard } from "store/ducks/card/cardActions";

interface ColumnProps {
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [isColumnEditeble, setIsColumnEditeble] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>("");

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && cardTitle !== "") {
      let cardID: string = Date.now().toString();
      const newCard = {
        cardTitle: cardTitle,
        ID: cardID,
        columnID: column.ID,
        description: "",
      };
      dispatch(addCard(newCard));
      setCardTitle("");
    }
  };

  const submitColumnName = (e: React.FormEvent) => {
    e.preventDefault();
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
            value={column.columnTitle}
            onChange={(e) => setColumnName(e.target.value)}
          />
        )}
      </div>
      <Cards column={column} />
      <StyledInput
        placeholder="Add a card"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
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
