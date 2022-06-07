import React, { useState } from "react";
import { useLocalStorage } from "hooks";
import { Column } from "components/Column";
import styled from "styled-components";
import { Modal } from "components/Modal/Modal";
import { ColumnType, TaskType, CommentType } from "types/types";
import { StyledInput } from "ui/StyledInput";
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { inputAuthor } from 'store/ducks/author/authorActions'

function App() {
  const dispatch = useAppDispatch()
  const columns = useAppSelector(state => state.columnReducer)
  const author = useAppSelector(state => state.authorReducer)

  const [authorName, setAuthorName] = useState("");
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("tasks", []);
  const [comments, setComments] = useLocalStorage<CommentType[]>(
    "comments",
    []
  );
  const [modalActive, setModalActive] = useState<boolean>(author === "user");

  const changeAuthor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.target.value);
  };

  const submitAuthor = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && authorName !== "") {
      dispatch(inputAuthor(authorName))
      setModalActive(false);
    }
  };

  const addTask = (taskTitle: string, columnID: string) => {
    let taskID: string = Date.now().toString();
    if (taskTitle !== "") {
      const tasksClone = [...tasks];
      const newTask = {
        taskTitle: taskTitle,
        ID: taskID,
        columnID: columnID,
        description: "",
      };
      tasksClone.push(newTask);
      setTasks(tasksClone);
    }
  };

  const deleteTask = (taskID: string) => {
    setTasks((perv) => perv.filter((task) => taskID !== task.ID));
  };

  const renameTask = (newTitle: string, taskID: string) => {
    setTasks((perv) =>
      perv.map((task) =>
        task.ID === taskID ? { ...task, taskTitle: newTitle } : task
      )
    );
  };

  const editDescription = (description: string, taskID: string) => {
    const tasksClone = tasks.map((task) =>
      task.ID === taskID ? { ...task, description: description } : task
    );
    setTasks(tasksClone);
  };

  const addComment = (comment: string, taskID: string) => {
    if (comment !== "") {
      const commentsClone = [...comments];
      const commentID = Date.now().toString();
      const newComment = {
        taskID: taskID,
        comment: comment,
        ID: commentID,
      };
      commentsClone.push(newComment);
      setComments(commentsClone);
    }
  };

  const editComment = (commentID: string, commentText: string) => {
    if (commentText !== "") {
      const commentsClone = comments.map((comment) =>
        comment.ID === commentID
          ? { ...comment, comment: commentText }
          : comment
      );
      setComments(commentsClone);
    }
  };

  const deleteComment = (commentID: string) => {
    setComments((perv) => perv.filter((comment) => comment.ID !== commentID));
  };

  return (
    <AppWrapper>
      <StyledH1>Hello, {author}</StyledH1>
      <Board>
        {columns.map((column) => (
          <Column
            key={column.ID}
            author={author}
            columnData={column}
            columnID={column.ID}
            tasks={tasks}
            comments={comments}
            renameTask={renameTask}
            deleteTask={deleteTask}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            editDescription={editDescription}
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
