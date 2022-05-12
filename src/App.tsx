import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import type { Task } from './types/Task';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { FILTER_MAP } from './lib/filter';
import type { FilterName } from './lib/filter';

type Props = {
  tasks: Task[];
};

function App(props: Props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name: string) {
    const newTask = {
      name,
      id: `todo-${nanoid()}`,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id: string, newName: string) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          name: newName,
        };
      }

      return task;
    });

    setTasks(editedTasks);
  }

  const [filter, setFilter] = useState<FilterName>('all');

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = (Object.keys(FILTER_MAP) as FilterName[]).map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>{filterList}</div>
      <h2 id='list-heading'>{headingText}</h2>
      {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
        {taskList}
      </ul>
    </div>
  );
}

export default App;
