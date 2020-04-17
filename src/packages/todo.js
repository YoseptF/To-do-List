const todoProto = (priority, title, description, dueDate, status = false) => ({
  priority, title, description, dueDate, status,
});

const todo = (priority, title, description, dueDate, status = false) => {
  const obj = Object.create(todoProto(priority, title, description, dueDate, status));
  return obj;
};

export default todo;
