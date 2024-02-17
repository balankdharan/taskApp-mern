import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const AddTaskContainer = styled.div`
  padding: 20px;
  border-radius: 5px;
`;

const AddTaskHeading = styled.h2`
  margin-bottom: 10px;
`;

const AddTaskForm = styled.form`
  display: flex;
  align-items: center;
`;

const AddTaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const AddTaskButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const AddTask = ({ fetchTasks }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/task`, { text });
      setText("");
      fetchTasks(); // Call fetchTasks from the prop
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <AddTaskContainer>
      <AddTaskHeading>Add Task</AddTaskHeading>
      <AddTaskForm onSubmit={handleSubmit}>
        <AddTaskInput
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
        />
        <AddTaskButton type="submit">Add Task</AddTaskButton>
      </AddTaskForm>
    </AddTaskContainer>
  );
};

export default AddTask;
