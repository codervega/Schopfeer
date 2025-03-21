import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Edit = ({ task, updateTask }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { ...task, title, description, category };
      const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask);
      if (response.status === 200) {
        updateTask(response.data.task);
        alert('Task updated successfully!');
      } else {
        alert('Failed to update task.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('An error occurred while updating the task.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default Edit;
