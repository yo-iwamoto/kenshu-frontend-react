import type { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';
import type { Task } from '../types/Task';

type Props = Task & {
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newName: string) => void;
};

const Todo: FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  function handleChange({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setNewName(value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.editTask(props.id, newName);
    cancelEditing();
  }

  function cancelEditing() {
    setNewName('');
    setIsEditing(false);
  }

  const editingTemplate = (
    <form className='stack-small' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='todo-label' htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} className='todo-text' type='text' value={newName} onChange={handleChange} />
      </div>
      <div className='btn-group'>
        <button type='button' className='btn todo-cancel' onClick={() => cancelEditing()}>
          Cancel
          <span className='visually-hidden'>renaming {props.name}</span>
        </button>
        <button type='submit' className='btn btn__primary todo-edit'>
          Save
          <span className='visually-hidden'>new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className='stack-small'>
      <div className='c-cb'>
        <input
          id={props.id}
          type='checkbox'
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className='todo-label' htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className='btn-group'>
        <button type='button' className='btn' onClick={() => setIsEditing(true)}>
          Edit <span className='visually-hidden'>{props.name}</span>
        </button>
        <button type='button' className='btn btn__danger' onClick={() => props.deleteTask(props.id)}>
          Delete <span className='visually-hidden'>{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className='todo'>{isEditing ? editingTemplate : viewTemplate}</li>;
};

export default Todo;
