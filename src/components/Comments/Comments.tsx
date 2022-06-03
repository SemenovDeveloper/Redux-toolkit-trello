import { useState } from "react";
import styled from "styled-components";
import { ColumnType, TaskType, CommentType } from "types/types";
import { StyledInput } from "ui/StyledInput";
import { Button } from "ui/Button/Button";
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";

interface CommentsProps {
  author: string;
  task: TaskType;
  comments: CommentType[];
  columnData: ColumnType;
  filteredComments: CommentType[];
  addComment: (comment: string, taskID: string) => void;
  deleteComment: (commentID: string) => void;
  editComment: (commentID: string, commentText: string) => void;
}

export const Comments: React.FC<CommentsProps> = ({
  task,
  addComment,
  author,
  filteredComments,
  deleteComment,
  editComment,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [editedCommentText, setEditedCommentText] = useState<string>("");
  const [isCommentEditeble, setIsCommentEditible] = useState<boolean>(false);
  const [activeComment, setActiveComment] = useState<CommentType>();

  const changeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const inputComment = () => {
    addComment(commentText, task.ID);
    setCommentText("");
  };

  const saveEditedComment = (commentID: string) => {
    editComment(commentID, editedCommentText);
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
                <div>
                  <input
                    defaultValue={comment.comment}
                    placeholder={comment.comment}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  ></input>
                  <button onClick={() => saveEditedComment(comment.ID)}>
                    save
                  </button>
                </div>
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
                onClick={() => deleteComment(comment.ID)}
              />
            </div>
          </StyledComment>
        );
      })}
      <StyledInput
        onChange={changeComment}
        placeholder="Add a comment"
        value={commentText}
      />
      <OkButton onClick={inputComment}>OK</OkButton>
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
