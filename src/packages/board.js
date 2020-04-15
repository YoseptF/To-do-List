import {
  DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects, displayTodoForm,
} from './domManipulation';
import { checkData, updateData, getLocalStorage } from './localStorage';
import { project, buttons } from './project';

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

const showTodoForm = () => {

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

  document.querySelector('.content').addEventListener('click', (event) => {
    console.count('click');
    displayTodoForm(event.target);
  });
};


export { createBoard, createProjectForm, createProject };
