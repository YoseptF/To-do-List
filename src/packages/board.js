import {
  DOMappend,
  DOMcreate,
  DOMListener,
  displayMessage,
  displayProjects,
  displayTodoForm,
  displayTodos,
  toggleTodoStatus,
  deleteProject,
  deleteTodo,
} from './domManipulation';
import { updateData, getLocalStorage } from './localStorage';
import project from './project';
import todo from './todo';

let projects = [];

const createObj = (proj) => ({
  id: proj.id, initial: proj.initial, name: proj.name, todos: proj.todos,
});

const createTodoObj = (toDo) => ({
  title: toDo.title,
  description: toDo.description,
  dueDate: toDo.dueDate,
  priority: toDo.priority,
  status: toDo.status,
});


const createProject = (e) => {
  e.preventDefault();
  const name = document.querySelector('.project-name').value;
  if (!name) {
    displayMessage('Please fill in the form', 'danger');
    return false;
  }
  const newProject = project(name);
  newProject.create();
  const obj = createObj(newProject);
  projects = getLocalStorage();
  projects.push(obj);
  updateData(projects);
  return true;
};

const addTodo = (e, id) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#dueDate').value;
  const priority = document.querySelector('#priority').value;
  if (!title || !description || !dueDate || !priority) {
    displayMessage('Please fill in all the fields', 'danger');
    return false;
  }
  const newTodo = todo(priority, title, description, dueDate);
  const obj = createTodoObj(newTodo);
  const localS = getLocalStorage();
  localS.forEach((proj) => {
    if (proj.id === id) {
      proj.todos.push(obj);
    }
  });
  updateData(localS);
  document.querySelector('#todo-form').remove();
  return true;
};

const createProjectForm = () => {
  const form = DOMcreate('form', 'project-form');
  const input = DOMcreate('input', 'project-name');
  const button = DOMcreate('input', 'project-submit');
  button.value = 'Create Project';
  input.placeholder = 'Project name';
  button.type = 'submit';
  DOMappend('.content', form);
  DOMappend('.project-form', input);
  DOMappend('.project-form', button);
  DOMListener('.project-form', 'submit', createProject);
};


const createBoard = () => {
  const background = DOMcreate('div', 'board');
  DOMappend('.content', background);

  if (getLocalStorage().length === 0) {
    const initialProject = project('Project test', true);
    initialProject.create();
    const obj = createObj(initialProject);
    projects.push(obj);
    updateData(projects);
  } else {
    const local = getLocalStorage();
    projects = local;
    displayProjects(projects);
  }

  const right = DOMcreate('div', 'right');
  DOMappend('.content', right);
  document.querySelector('.right').addEventListener('click', (e) => toggleTodoStatus(e.target));
  document.querySelector('.content').addEventListener('click', (event) => {
    displayTodoForm(event.target, addTodo);
    displayTodos(event.target);
    deleteProject(event.target);
    deleteTodo(event.target);
  });
};


export {
  createBoard, createProjectForm, createProject, addTodo,
};
