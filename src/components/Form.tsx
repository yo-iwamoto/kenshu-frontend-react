import type { FC } from 'react';
import type { FormEvent } from 'react';

type Props = {
  addTask: (name: string) => void;
};

const Form: FC<Props> = (props) => {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    props.addTask('Say hello!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='label-wrapper'>
        <label htmlFor='new-todo-input' className='label__lg'>
          What needs to be done?
        </label>
      </h2>
      <input type='text' id='new-todo-input' className='input input__lg' name='text' autoComplete='off' />
      <button type='submit' className='btn btn__primary btn__lg'>
        Add
      </button>
    </form>
  );
};

export default Form;
