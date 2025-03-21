import React from 'react';

const TaskList = ({ tasks, setEditingTask, deleteTask }) => {
  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <p>Category: {task.category}</p>
              <button onClick={() => setEditingTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
