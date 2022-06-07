import { useState } from "react";
import styled from "styled-components";
import { TaskType, CommentType } from "types/types";
import { Form } from "ui/Form/Form";
import { Button } from "ui/Button/Button";
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  addComment,
  deleteComment,
  editComment,
} from "store/ducks/comment/commentActions";

interface CommentsProps {
  task: TaskType;
}

export const Comments: React.FC<CommentsProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.commentReducer);
  const author = useAppSelector((state) => state.authorReducer);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const [editedCommentText, setEditedCommentText] = useState<string>("");
  const [isCommentEditeble, setIsCommentEditible] = useState<boolean>(false);
  const [activeComment, setActiveComment] = useState<CommentType>();
  const filteredComments = comments.filter(
    (comment) => comment.taskID === task.ID
  );

  const inputComment = () => {
    if (newCommentText !== "") {
      const commentID = Date.now().toString();
      const newComment = {
        ID: commentID,
        comment: newCommentText,
        taskID: task.ID,
      };
      dispatch(addComment(newComment));
      setNewCommentText("");
    }
  };

  const saveEditedComment = (commentID: string) => {
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
              {isCommentEditeble && comment.ID === activeComment?.ID && (
                <Form
                  onHandleClick={() => saveEditedComment(comment.ID)}
                  placeholder="de a comment"
                  value={comment.comment}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
              )}
            </TextBlock>
            <div>
              <Button
                img={editIcon}
                onClick={() => {
                  setIsCommentEditible(true);
                  setEditedCommentText(comment.comment);
                  setActiveComment(comment);
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
        value={''}
        onChange={(e) => setNewCommentText(e.target.value)}
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

const OkButton = styled.button`
  padding: 0;
  margin: 5px;
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

const Title = styled.h5`
  max-width: 50%;
  word-wrap: break-word;
`;
