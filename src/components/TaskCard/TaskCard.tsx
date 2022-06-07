import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { ColumnType, TaskType, CommentType } from "types/types";
import { Comments } from "components/Comments";
import { Modal } from "components/Modal/Modal";
import { FlexContainer } from "ui/FlexContainer";
import { Button } from 'ui/Button/Button'
import { Form } from 'ui/Form/Form';
import editIcon from "images/editIcon.svg";
import deleteIcon from "images/deleteIcon.svg";
import closeIcon from "images/closeIcon.svg";
import commentsIcon from "images/commentsIcon.png";
import { renameTask, deleteTask, editDescription, deleteDescription } from 'store/ducks/card/cardActions';
import { useAppDispatch, useAppSelector } from 'hooks/redux'


interface TaskPopupProps {
  author: string;
  task: TaskType;
  columnData: ColumnType;
  comments: CommentType[];
  addComment: (comment: string, taskID: string) => void;
  editDescription: (description: string, taskID: string) => void;
  deleteComment: (commentID: string) => void;
  editComment: (commentID: string, commentText: string) => void;
  // deleteTask: (taskID: string) => void;
  // renameTask: (newTitle: string, taskID: string) => void;
}

export const TaskCard: React.FC<TaskPopupProps> = ({
  task,
  columnData,
  author,
  comments,
  // editDescription,
  addComment,
  deleteComment,
  editComment,
  // deleteTask,
  // renameTask,
}) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.taskReducer);
  // const activeTask: TaskType = tasks.find(x => x.ID === task.ID);

  const [activePopup, setActivePopup] = useState(false);
  const [isDescriptionEditible, setIsDescriptionEditible] =
    useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [isTaskTitleEditible, setIsTaskTitleEditible] =
    useState<boolean>(false);
  const [newTaskName, setNewTaskName] = useState<string>("");

  const filteredComments = useMemo(
    () => comments.filter((comment) => task.ID === comment.taskID),
    [task.ID, comments]
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

  const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const submitTaskName = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(renameTask({ID: task.ID, newTitle: newTaskName}))
    setIsTaskTitleEditible(false);
  }

  return (
    <>
      <StyledTaskCard>
        <FlexContainer>
          <TaskTitle>{task.taskTitle}</TaskTitle>
          <FlexContainer>
            <Button
              img={editIcon}
              onClick={() => setActivePopup(true)}
            ></Button>
            <Button
              img={deleteIcon}
              onClick={() => dispatch(deleteTask(task.ID))}
            ></Button>
          </FlexContainer>
        </FlexContainer>
        <CommentsBlock>
          <CommentsIcon />
          <p>{filteredComments.length}</p>
        </CommentsBlock>
      </StyledTaskCard>
      <Modal active={activePopup}>
        <PopupWrapper>
          <FlexContainer>
            <NarrowFlexibleContainer>
              {isTaskTitleEditible ? (
                <Form
                onHandleClick={submitTaskName} 
                placeholder="Enter Column Name"
                value={task.taskTitle}
                onChange={(e) => setNewTaskName(e.target.value)}
              />            
              ) : (
                <PopupTitle>{task.taskTitle}</PopupTitle>
              )}
              <Button
                img={editIcon}
                onClick={() => setIsTaskTitleEditible(!isTaskTitleEditible)}
              ></Button>
            </NarrowFlexibleContainer>
            <CloseButton onClick={() => setActivePopup(false)}></CloseButton>
          </FlexContainer>
          <StyledText>
            in list <BoldText>{columnData.columnTitle}</BoldText> by{" "}
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
                    onClick={() => dispatch(deleteDescription(task.ID))}
                  />
                </div>
              </NarrowFlexibleContainer>
              <DescText>{task.description}</DescText>
              {isDescriptionEditible && (
                <Form
                  onHandleClick={() => {
                    dispatch(editDescription({ID: task.ID,
                      desription: description}))
                    setIsDescriptionEditible(false);
                  }}
                  placeholder="Enter Description..."
                  value={task.description}
                  onChange={changeDescription}
                />              
              )}
            </DescWrapper>
            <Comments
              comments={comments}
              author={author}
              task={task}
              addComment={addComment}
              columnData={columnData}
              filteredComments={filteredComments}
              deleteComment={deleteComment}
              editComment={editComment}
            />
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

const StyledTaskCard = styled.div`
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

const TaskTitle = styled.h3`
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
