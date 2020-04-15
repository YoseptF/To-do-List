import {
  DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects, displayTodoForm, displayTodos, toggleTodoStatus, deleteProject,
} from './domManipulation';
import { updateData, getLocalStorage } from './localStorage';
import { project, buttons } from './project';
import todo from './todo';

let projects = [];

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
  projects.push(obj);
  updateData(projects);
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
  localS.forEach((project) => {
    if (project.id === id) {
      project.todos.push(obj);
    }
  });
  updateData(localS);
  document.querySelector('#todo-form').remove();
};

const createProjectForm = () => {
  const form = DOMcreate('form', 'project-form');
  const input = DOMcreate('input', 'project-name');
  const button = DOMcreate('input', 'project-submit');
  button.value = 'Create Project';
  button.type = 'submit';
  DOMappend('.content', form);
  DOMappend('.project-form', input);
  DOMappend('.project-form', button);
  DOMListener('.project-form', 'submit', createProject);
};

const createObj = (project) => ({ id: project.id, name: project.name, todos: project.todos });

const createTodoObj = (todo) => ({
  title: todo.title, description: todo.description, dueDate: todo.dueDate, priority: todo.priority, status: todo.status,
});


const createBoard = () => {
  const background = DOMcreate('div', 'board');
  DOMappend('.content', background);

  if (getLocalStorage().length === 0) {
    console.log('times');
    const initialProject = project('Project test');
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
    displayTodoForm(event.target);
    displayTodos(event.target);
    deleteProject(event.target);
  });
};


export {
  createBoard, createProjectForm, createProject, addTodo,
};
