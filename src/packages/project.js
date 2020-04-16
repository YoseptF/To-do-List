import moment from 'moment';
import {
  DOMcreate, DOMappend, DOMListener, displayTodoForm,
} from './domManipulation';

const buttons = (proj) => {
  const buttonWrapper = DOMcreate('div', 'buttons');
  const deleteBtn = DOMcreate('button', 'delete-btn');
  const addBtn = DOMcreate('button', 'add-btn');
  const checkBtn = DOMcreate('button', 'check-btn');

  deleteBtn.innerHTML = 'delete';
  checkBtn.innerHTML = 'check';
  addBtn.innerHTML = 'add';

  proj.append(buttonWrapper);
  buttonWrapper.append(deleteBtn);
  buttonWrapper.append(addBtn);
  buttonWrapper.append(checkBtn);

  DOMListener('.add-btn', 'click', displayTodoForm);
};


const projectProto = (name) => {
  const id = moment().format('MM Do YY, h:mm:ss a');
  const create = () => {
    const item = DOMcreate('div', 'project');
    const h2 = DOMcreate('h2', 'project-title');
    h2.innerText = name;
    const date = DOMcreate('h3', 'date');
    date.innerHTML = id;

    item.append(h2);
    item.append(date);

    DOMappend('.board', item);

    buttons(item);
  };
  const todos = [];
  return {
    create, name, todos, id,
  };
};

const project = (name) => Object.create(projectProto(name));

export { project, buttons };
