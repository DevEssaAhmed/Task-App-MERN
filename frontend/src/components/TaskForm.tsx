import React, { ChangeEvent, FormEvent } from 'react';

interface TaskFormProps {
  createTask: (e: FormEvent<HTMLFormElement>) => void;
  name: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  createTask,
  name,
  handleInputChange,
}) => {
  return (
    <form className='task-form' onSubmit={createTask}>
      <input
        type='text'
        placeholder='Add a Task'
        name='name'
        value={name}
        onChange={handleInputChange}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default TaskForm;
