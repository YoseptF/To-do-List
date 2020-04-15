import { DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects } from './domManipulation';
import { checkData, updateData, getLocalStorage } from './localStorage';
import project from './project';

let projects = [];

const createProject = (e) => {
  e.preventDefault();
  let name = document.querySelector('.project-name').value
  if (!name) {
    displayMessage('Please fill in the form', 'danger');
    return false;
  }
  const newProject = project(name);
  console.log(newProject);
  newProject.create();
  let obj = createObj(newProject)
  projects.push(obj);
  updateData(projects);
};

const createProjectForm = () => {
  let form = DOMcreate('form', 'project-form');
  let input = DOMcreate('input', 'project-name');
  let button = DOMcreate('input', 'project-submit');
  button.value = "Create Project";
  button.type = 'submit'
  DOMappend('.content', form);
  DOMappend('.project-form', input);
  DOMappend('.project-form', button);
  DOMListener('.project-form','submit', createProject)
}

const createObj = (project) => ({ name: project.name, todos: project.todos })


const createBoard = () => {
  const background = DOMcreate('div', 'board');
  DOMappend('.content', background);

  if (getLocalStorage().length===0) {
    console.log("empty")
    const initialProject = project('Project test');
    console.log(initialProject);
    initialProject.create();
    let obj = createObj(initialProject)
    projects.push(obj);
    updateData(projects);
  } else {
    console.log("not empty")
    let local = getLocalStorage();
    projects = local;
    displayProjects(projects);
  }
};


export { createBoard, createProjectForm, createProject };
