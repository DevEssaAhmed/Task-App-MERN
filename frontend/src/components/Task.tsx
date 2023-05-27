import React from 'react';
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ObjectId } from 'mongodb';

interface TaskProps {
  task: {
    _id: string | ObjectId;
    name: string;
    completed: boolean;
  };
  index: number;
  deleteTask: (id: string) => void;
  getSingleTask: any;
  setToComplete: any;
}

const Task: React.FC<TaskProps> = ({
  task,
  index,
  deleteTask,
  getSingleTask,
  setToComplete,
}) => {
  const handleDeleteTask = () => {
    const taskId = task._id.toString();
    deleteTask(taskId);
  };

  const handleGetSingleTask = () => {
    getSingleTask(task);
  };
  const handleComplete = () => {
    setToComplete(task);
  };
  return (
    <div className={task.completed ? 'task completed' : 'task'}>
      <p>
        <b>{index + 1}</b> {task.name}
      </p>
      <div className='task-icons'>
        <FaCheckDouble color='green' onClick={handleComplete} />
        <FaEdit color='skyblue' onClick={handleGetSingleTask} />
        <FaRegTrashAlt onClick={handleDeleteTask} color='red' />
      </div>
    </div>
  );
};

export default Task;
