import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { TaskType } from "types/types";
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
  renameTask,
  deleteTask,
  editDescription,
  deleteDescription,
} from "store/ducks/card/cardActions";
import { useAppDispatch, useAppSelector } from "hooks/redux";

interface TaskPopupProps {
  task: TaskType;
}

export const TaskCard: React.FC<TaskPopupProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.commentReducer);
  const author = useAppSelector((state) => state.authorReducer);
  const columns = useAppSelector((state) => state.columnReducer);
  const columnTitle = columns.find(
    (column) => column.ID === task.columnID
  )?.columnTitle;
  const [activePopup, setActivePopup] = useState(false);
  const [isDescriptionEditible, setIsDescriptionEditible] =
    useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [isTaskTitleEditible, setIsTaskTitleEditible] =
    useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

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

  const submitTaskName = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(renameTask({ ID: task.ID, newTitle: newTaskTitle }));
    setIsTaskTitleEditible(false);
  };

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
                  onChange={(e) => setNewTaskTitle(e.target.value)}
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
            in list <BoldText>{columnTitle}</BoldText> by{" "}
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
                    dispatch(
                      editDescription({ ID: task.ID, desription: description })
                    );
                    setIsDescriptionEditible(false);
                  }}
                  placeholder="Enter Description..."
                  value={task.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
            </DescWrapper>
            <Comments task={task} />
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
