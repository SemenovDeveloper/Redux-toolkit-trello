import { useState } from "react";
import styled from "styled-components";
import { CardType } from "types/types";
import { Form, Button } from "ui";
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";
import { useAppDispatch, useAppSelector } from "hooks";
import { addComment, deleteComment, editComment } from "store/ducks";

interface CommentsProps {
  card: CardType;
}

export const Comments: React.FC<CommentsProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.commentReducer);
  const author = useAppSelector((state) => state.authorReducer);
  const [isCommentEditeble, setIsCommentEditible] = useState<boolean>(false);
  const [editebleCommentID, setEditebleCommentID] = useState<string>();
  const filteredComments = comments.filter(
    (comment) => comment.cardID === card.ID
  );

  const inputComment = (newCommentText: string) => {
    if (newCommentText !== "") {
      const commentID = Date.now().toString();
      const newComment = {
        ID: commentID,
        comment: newCommentText,
        cardID: card.ID,
      };
      dispatch(addComment(newComment));
    }
  };

  const saveEditedComment = (commentID: string, editedCommentText: string) => {
    dispatch(editComment({ ID: commentID, newComment: editedCommentText }));
    setIsCommentEditible(false);
  };

  return (
    <>
      <StyledTitle>Comments</StyledTitle>
      {filteredComments.map((comment) => {
        return (
          <StyledComment key={comment.ID}>
            <TextBlock>
              <Title>{author}</Title>
              <CommentText>{comment.comment}</CommentText>
              {isCommentEditeble && comment.ID === editebleCommentID && (
                <Form
                  onHandleClick={(editedCommentText) =>
                    saveEditedComment(comment.ID, editedCommentText)
                  }
                  placeholder=""
                  defaultValue={comment.comment}
                />
              )}
            </TextBlock>
            <div>
              <Button
                img={editIcon}
                onClick={() => {
                  setIsCommentEditible(!isCommentEditeble);
                  setEditebleCommentID(comment.ID);
                }}
              />
              <Button
                img={deleteIcon}
                onClick={() => dispatch(deleteComment(comment.ID))}
              />
            </div>
          </StyledComment>
        );
      })}
      <Form
        onHandleClick={inputComment}
        placeholder="Add a comment"
        defaultValue=""
      ></Form>
    </>
  );
};

const StyledComment = styled.div`
  width: 90%;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 12px 6px;
  padding: 4px;
  background-color: #ffffff;
  & h5 {
    margin-right: 10px;
  }
`;

const TextBlock = styled.div``;

const CommentText = styled.p`
  width: 380px;
  word-wrap: break-word;
`;

const StyledTitle = styled.h3`
  margin-left: 4px;
`;

const Title = styled.h5`
  max-width: 50%;
  word-wrap: break-word;
`;
