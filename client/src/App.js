import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  width: 80%;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-left: 35px solid #fa2a55;
  border-right: 35px solid #fa2a55;
  border-top: 25px solid #fa2a55;
  border-bottom: 25px solid #fa2a55;
  border-radius: 55px;
`;

const TitleBox = styled.h1`
  background-color: #fa2a55;
  color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
  animation: popUpAnimation 0.5s ease-in-out;

  @keyframes popUpAnimation {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ToggleButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
`;

const AddTaskContainer = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  min-width: 500px;
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/task`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  return (
    <AppContainer>
      <GlobalStyle />
      <TitleBox>Task Management</TitleBox>
      <TaskList tasks={tasks} />
      <ToggleButton onClick={toggleAddTask}>
        {showAddTask ? "Close" : "Add Task"}
      </ToggleButton>
      <AddTaskContainer isVisible={showAddTask}>
        <AddTask fetchTasks={fetchTasks} />
      </AddTaskContainer>
    </AppContainer>
  );
}

export default App;
