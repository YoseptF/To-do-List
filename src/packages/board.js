import { DOMappend, DOMcreate } from './domManipulation';
import { checkData, updateData } from './localStorage';
import project from './project';

const projects = [];

const createProject = () => {
  const newProject = project();
  newProject.create();
  projects.push(newProject);
  updateData(projects);
};

const createBoard = () => {
  const background = DOMcreate('div', 'board');
  DOMappend('.content', background);

  if (checkData) {
    const initialProject = project();
    initialProject.create();
    projects.push(initialProject);
    updateData(projects);
  } else {
    // getDataFromLocal();
    // createFromLocal();
  }
};


export default createBoard;
