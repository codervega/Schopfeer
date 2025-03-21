import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/list-all-task')}>See All Tasks</button>
      <button onClick={() => navigate('/add-task')}>Add Task</button>
      <button onClick={() => navigate('/delete')}>Delete Task</button>
      <button onClick={() => navigate('/list-all-task')}>Edit Task</button>
    </div>
  );
};

export default Dashboard;
