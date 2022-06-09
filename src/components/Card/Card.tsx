import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { CardType, ColumnType, CommentType } from "types/types";
import { Comments, Modal } from "components";
import { FlexContainer, Button, Form } from "ui";
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";
import closeIcon from "images/closeIcon.svg";
import commentsIcon from "images/commentsIcon.png";
import { deleteCard, editCard } from "store/ducks";
import { useAppDispatch, useAppSelector } from "hooks";

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
    () => comments.filter((comment: CommentType) => card.ID === comment.cardID),
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
    dispatch(editCard({ ...card, cardTitle: cardName }));
    setIsCardTitleEditible(false);
  };

  const submitEditedDescritption = (description: string) => {
    dispatch(editCard({ ...card, description: description }));
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
            <Button  img={closeIcon} onClick={() => setActivePopup(false)}></Button>
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
                    onClick={() =>
                      dispatch(editCard({ ...card, description: "" }))
                    }
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