import React from 'react';
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
const Task = ({ task, index, deleteTask }) => {
  return (
    <div className='task'>
      <p>
        <b>{index + 1}</b>
        {task.name}
      </p>
      <div className='task-icons'>
        <FaCheckDouble color='green' />
        <FaEdit color='skyblue' />
        <FaRegTrashAlt
          onClick={() => {
            deleteTask(task._id);
          }}
          color='red'
        />
      </div>
    </div>
  );
};

export default Task;
