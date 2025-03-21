import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteTask = ({ taskId, onDelete }) => {
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onDelete(taskId);
    } catch (err) {
      setError('Failed to delete the task. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Task</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default DeleteTask;
