import React, { useState } from "react";
import { Column } from "components/Column";
import styled from "styled-components";
import { Modal } from "components/Modal/Modal";
import { StyledInput } from "ui/StyledInput";
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { inputAuthor } from 'store/ducks/author/authorActions'

function App() {
  const dispatch = useAppDispatch()
  const columns = useAppSelector(state => state.columnReducer)
  const author = useAppSelector(state => state.authorReducer)
  const [authorName, setAuthorName] = useState("");
  const [modalActive, setModalActive] = useState<boolean>(author === "user");

  const submitAuthor = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && authorName !== "") {
      dispatch(inputAuthor(authorName))
      setModalActive(false);
    }
  };

  return (
    <AppWrapper>
      <StyledH1>Hello, {author}</StyledH1>
      <Board>
        {columns.map((column) => (
          <Column
            key={column.ID}
            columnData={column}
          />
        ))}
      </Board>
      <Modal active={modalActive}>
        <ContentWrapper>
          <h2>Welcome to NashTrello</h2>
          <div>
            <StyledInput
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setAuthorName(e.target.value)}
              onKeyPress={submitAuthor}
            ></StyledInput>
          </div>
        </ContentWrapper>
      </Modal>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(18, 69, 89, 1) 0%,
    rgba(89, 131, 146, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  min-height: 200px;
  padding: 24px 12px;
`;

const StyledH1 = styled.h1`
  width: 95%;
  color: #dcdcdd;
  word-wrap: break-word;
`;

const ContentWrapper = styled.div`
  font-size: 24px;
  width: 450px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const SubmitButton = styled.button`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;

export default App;
