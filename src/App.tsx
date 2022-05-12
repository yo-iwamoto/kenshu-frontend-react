import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import type { Task } from './types/Task';

type Props = {
  tasks: Task[];
};

function App(props: Props) {
  const taskList = props.tasks.map((task) => (
    <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} />
  ));

  function addTask(name: string) {
    alert(name);
  }

  return (
    <div className='todoapp stack-large'>
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className='filters btn-group stack-exception'>
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id='list-heading'>3 tasks remaining</h2>
      <ul role='list' className='todo-list stack-large stack-exception' aria-labelledby='list-heading'>
        {taskList}
      </ul>
    </div>
  );
}

export default App;