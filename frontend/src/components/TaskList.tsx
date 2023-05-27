import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import { toast } from 'react-toastify';
import axios from 'axios';
import loadingGif from '../assets/loader.gif';
const url = import.meta.env.VITE_APP_SERVER_URL;
interface FormData {
  name: string;
  completed: boolean;
}

interface Task {
  _id: string;
  name: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Specify the type of tasks as an array of Task
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]); // Specify the type of completedTasks as an array of Task
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    completed: false,
  });
  const { name } = formData;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const getTasks = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await axios.get(`${url}/api/v1/tasks`);
  //     setTasks(data.tasks); // Access the tasks array from the data object
  //     console.log(tasks)
  //     setIsLoading(false);
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     setIsLoading(false);
  //   }
  // };
  const getTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/tasks`);
      // console.log(response.data); // Log the response data to inspect its structure
      const tasksData = response.data.data;
      // console.log(tasksData); // Log the tasksData to inspect its structure
      setTasks(tasksData.tasks);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const showTasks = async () => {
      await getTasks();
    };
    showTasks();
  }, []);

  const createTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '') {
      return toast.error('Input field cannot be empty');
    }
    try {
      await axios.post(`${url}/api/v1/tasks`, formData);
      toast.success('Task added');
      setFormData({ ...formData, name: '' });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${url}/api/v1/tasks/${id}`);
      getTasks();
    } catch (error) {}
  };

  const getSingleTask = async (task: Task) => {
    setFormData({
      name: task.name,
      completed: false,
    });
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
      />
      <div className='--flex-between --pb'>
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className='--flex-center'>
          <img src={loadingGif} alt='' />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className='--py'>No Tasks Added. Please Add A Task</p>
      ) : (
        tasks.map((task, index) => (
          <Task
            key={task._id}
            task={task}
            index={index}
            deleteTask={deleteTask}
            getSingleTask={getSingleTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
