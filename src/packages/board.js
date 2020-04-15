import {
  DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects, displayTodoForm, displayTodos, toggleTodoStatus
} from './domManipulation';
import { checkData, updateData, getLocalStorage } from './localStorage';
import { project, buttons } from './project';
import todo  from './todo';

let projects = [];

const createProject = (e) => {
  e.preventDefault();
  const name = document.querySelector('.project-name').value;
  if (!name) {
    displayMessage('Please fill in the form', 'danger');
    return false;
  }
  const newProject = project(name);
  console.log(newProject);
  newProject.create();
  const obj = createObj(newProject);
  projects.push(obj);
  updateData(projects);
};

const addTodo = (e, id) => {
  e.preventDefault();
  console.log("Add todo");
  let title = document.querySelector('#title').value
  let description = document.querySelector('#description').value
  let dueDate = document.querySelector('#dueDate').value
  let priority = document.querySelector('#priority').value
  if (!title || !description || !dueDate || !priority) {
    displayMessage("Please fill in all the fields", 'danger');
    return false;
  }
  let newTodo = todo(priority, title, description, dueDate);
  console.log("New todo: ", newTodo);
  let obj = createTodoObj(newTodo);
  let localS = getLocalStorage();
  console.log("LOCALSTARAGE: ", localS);
  localS.forEach(project => {
    console.log("PROJECT: ", project);
    console.log("ID: ", id);
    if (project.id === id) {
      console.log("yess")
      project.todos.push(obj)
    }
  })
  updateData(localS);
  document.querySelector('#todo-form').remove();

}

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

const createTodoObj = (todo) => ({ title: todo.title, description: todo.description, dueDate: todo.dueDate, priority: todo.priority, status: todo.status });


const createBoard = () => {
  const background = DOMcreate('div', 'board');
  DOMappend('.content', background);

  if (getLocalStorage().length === 0) {
    console.log('empty');
    const initialProject = project('Project test');
    console.log(initialProject);
    initialProject.create();
    const obj = createObj(initialProject);
    projects.push(obj);
    updateData(projects);
  } else {
    console.log('not empty');
    const local = getLocalStorage();
    projects = local;
    displayProjects(projects);
  }

  const right = DOMcreate('div', 'right');
  DOMappend('.content', right);
  document.querySelector('.right').addEventListener('click', (e) => toggleTodoStatus(e.target));
  document.querySelector('.content').addEventListener('click', (event) => {
    console.count('click');
    displayTodoForm(event.target);
    displayTodos(event.target);
  });
};


export { createBoard, createProjectForm, createProject, addTodo };
