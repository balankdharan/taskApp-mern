import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import TaskModal from "./TaskModal";
import axios from "axios";

const TaskListContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  min-width: 500px;
`;

const TaskListUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TaskItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const TaskText = styled.span`
  flex: 1;
  margin-right: 10px;
`;

const TaskStatusButton = styled.button`
  padding: 5px 10px;
  background-color: ${(props) => (props.completed ? "#4CAF50" : "gold")};
  color: white;
  border: none;
  border-radius: 5px;
`;
const EditIcon = styled(FaEdit)`
  font-size: 1.2rem;
  color: #3498db;
  margin: 5px;
  cursor: pointer;
`;

const TaskList = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleUpdate = async () => {
    console.log("id", selectedTask);
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/task/${selectedTask._id}`,
      {
        completed: !selectedTask.completed,
      }
    );
    closeModal();
    window.location.reload();
    // Implement update logic here
  };

  const handleDelete = async () => {
    // Implement delete logic here
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/task/${selectedTask._id}`
    );
    closeModal();
    window.location.reload();
  };
  return (
    <TaskListContainer>
      <h2>Task List</h2>
      <TaskListUL>
        {tasks.map((task) => (
          <TaskItem key={task._id}>
            <TaskText>{task.text}</TaskText>
            <TaskStatusButton completed={task.completed}>
              {task.completed ? "Completed" : "Pending"}
            </TaskStatusButton>
            <EditIcon onClick={() => openModal(task)} />
          </TaskItem>
        ))}
      </TaskListUL>
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </TaskListContainer>
  );
};

export default TaskList;
