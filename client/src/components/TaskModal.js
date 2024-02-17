import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const CompleteButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;
const EditButton = styled.button`
  background-color: #fcbc00;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
`;
const EditTaskInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;
const TaskModal = ({ task, onClose, onUpdate, onDelete }) => {
  const [text, setText] = useState(task.text);
  const onEdit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    try {
      await axios.put(`http://localhost:5000/api/v1/task/${task._id}`, {
        text,
      });
      setText("");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer onClick={handleClickOutside}>
      <ModalContent>
        <ModalTitle>Edit Task</ModalTitle>
        <p>
          <span style={{ fontWeight: "bold" }}>Task : </span>
          <EditTaskInput
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task..."
          />
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Status : </span>
          <span
            style={{
              padding: "8px",
              color: "#7F00FF",
            }}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </p>
        <ModalButtons>
          {!task.completed && (
            <>
              <CompleteButton onClick={onUpdate}>Complete</CompleteButton>
              <EditButton onClick={onEdit}>Update</EditButton>
            </>
          )}
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        </ModalButtons>
      </ModalContent>
    </ModalContainer>
  );
};

export default TaskModal;
