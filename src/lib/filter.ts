import type { Task } from '../types/Task';

export const FILTER_MAP = {
  all: () => true,
  active: (task: Task) => !task.completed,
  completed: (task: Task) => task.completed,
};

export type FilterName = keyof typeof FILTER_MAP;
