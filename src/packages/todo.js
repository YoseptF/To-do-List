import { DOMcreate } from './domManipulation';

const todoProto = (priority, title, description, dueDate, status = false) => {
  const create = (proj) => {
    proj.todo.push({
      priority, title, description, dueDate, status,
    });
  };

  return { create };
};

const todo = (priority, title, description, dueDate, status = false) => {
  const obj = Object.create(todoProto(priority, title, description, dueDate, status));
  return obj;
};

export default todo;
