import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Task from './components/Task';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className='app'>
      <div className='task-container'>
        <TaskList />
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
