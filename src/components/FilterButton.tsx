import type { FC } from 'react';
import type { FilterName } from '../lib/filter';

type Props = {
  name: FilterName;
  isPressed: boolean;
  setFilter: (name: FilterName) => void;
};

const FilterButton: FC<Props> = (props) => {
  return (
    <button
      type='button'
      className='btn toggle-btn'
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className='visually-hidden'>Show </span>
      <span>{props.name} </span>
      <span className='visually-hidden'> tasks</span>
    </button>
  );
};

export default FilterButton;
