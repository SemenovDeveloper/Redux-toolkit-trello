import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { CardType, ColumnType } from "types/types";
import { Comments } from "components/Comments";
import { Modal } from "components/Modal/Modal";
import { FlexContainer } from "ui/FlexContainer";
import { Button } from "ui/Button/Button";
import { Form } from "ui/Form/Form";
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";
import closeIcon from "images/closeIcon.svg";
import commentsIcon from "images/commentsIcon.png";
import {
  renameCard,
  deleteCard,
  editDescription,
  deleteDescription,
} from "store/ducks/card/cardActions";
import { useAppDispatch, useAppSelector } from "hooks/redux";

interface CardPopupProps {
  card: CardType;
  column: ColumnType;
}

export const Card: React.FC<CardPopupProps> = ({ card, column }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.commentReducer);
  const author = useAppSelector((state) => state.authorReducer);
  const [activePopup, setActivePopup] = useState(false);
  const [isDescriptionEditible, setIsDescriptionEditible] =
    useState<boolean>(false);
  const [isCardTitleEditible, setIsCardTitleEditible] =
    useState<boolean>(false);

  const filteredComments = useMemo(
    () => comments.filter((comment) => card.ID === comment.cardID),
    [card.ID, comments]
  );

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActivePopup(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const submitCardName = (cardName: string) => {
    dispatch(renameCard({ ID: card.ID, newTitle: cardName }));
    setIsCardTitleEditible(false);
  };

  const submitEditedDescritption = (description: string) => {
    dispatch(editDescription({ ID: card.ID, desription: description }));
    setIsDescriptionEditible(false);
  };

  return (
    <>
      <StyledCardCard>
        <FlexContainer>
          <CardTitle>{card.cardTitle}</CardTitle>
          <FlexContainer>
            <Button
              img={editIcon}
              onClick={() => setActivePopup(true)}
            ></Button>
            <Button
              img={deleteIcon}
              onClick={() => dispatch(deleteCard(card.ID))}
            ></Button>
          </FlexContainer>
        </FlexContainer>
        <CommentsBlock>
          <CommentsIcon />
          <p>{filteredComments.length}</p>
        </CommentsBlock>
      </StyledCardCard>
      <Modal active={activePopup}>
        <PopupWrapper>
          <FlexContainer>
            <NarrowFlexibleContainer>
              {isCardTitleEditible ? (
                <Form
                  onHandleClick={submitCardName}
                  placeholder="Enter Column Name"
                  defaultValue={""}
                />
              ) : (
                <PopupTitle>{card.cardTitle}</PopupTitle>
              )}
              <Button
                img={editIcon}
                onClick={() => setIsCardTitleEditible(!isCardTitleEditible)}
              ></Button>
            </NarrowFlexibleContainer>
            <CloseButton onClick={() => setActivePopup(false)}></CloseButton>
          </FlexContainer>
          <StyledText>
            in list <BoldText>{column.columnTitle}</BoldText> by{" "}
            <BoldText>{author}</BoldText>
          </StyledText>
          <div>
            <DescWrapper>
              <NarrowFlexibleContainer>
                <h3>Description</h3>
                <div>
                  <Button
                    img={editIcon}
                    onClick={() =>
                      setIsDescriptionEditible(!isDescriptionEditible)
                    }
                  />
                  <Button
                    img={deleteIcon}
                    onClick={() => dispatch(deleteDescription(card.ID))}
                  />
                </div>
              </NarrowFlexibleContainer>
              <DescText>{card.description}</DescText>
              {isDescriptionEditible && (
                <Form
                  onHandleClick={submitEditedDescritption}
                  placeholder="Enter Description..."
                  defaultValue={card.description}
                />
              )}
            </DescWrapper>
            <Comments card={card} />
          </div>
        </PopupWrapper>
      </Modal>
    </>
  );
};

const CommentsIcon = styled.div`
  background: center/100% url(${commentsIcon}) no-repeat;
  width: 20px;
  height: 20px;
  margin: 5px;
`;

const StyledCardCard = styled.div`
  margin: 5px 0;
  background-color: #ffffff;
  border-radius: 6px;
`;
const CommentsBlock = styled.div`
  display: flex;
  align-items: center;
`;

const PopupWrapper = styled.div`
  width: 500px;
  min-height: 600px;
`;
const NarrowFlexibleContainer = styled.div`
  padding-left: 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  margin: 20px 0;
`;

const StyledText = styled.p`
  padding: 0 12px;
`;

const DescWrapper = styled.div`
  margin: 30px 0;
`;

const DescText = styled.div`
  width: 90%;
  margin: 12px 6px;
  padding: 4px;
  word-wrap: break-word;
`;

const CloseButton = styled.button`
  padding: 0;
  margin: 5px;
  background: center/80% url(${closeIcon}) no-repeat;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: #010140;
  &:hover {
    opacity: 0.5;
  }
`;

const CardTitle = styled.h3`
  min-width: 120px;
  word-wrap: break-word;
`;
const PopupTitle = styled.h2`
  width: 80%;
  word-wrap: break-word;
`;

const BoldText = styled.b`
  word-wrap: break-word;
`;
