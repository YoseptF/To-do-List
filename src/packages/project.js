import { DOMcreate, DOMappend } from './domManipulation';

const projectProto = (name) => {
  const create = () => {
    const item = DOMcreate('div', 'project');
    let h2 = DOMcreate('h2', 'project-title');
    h2.innerText = name;
    item.append(h2);
    DOMappend('.board', item);
  };
  const todos = [];
  return { create, name, todos };
};

const project = (name) => Object.create(projectProto(name));

export default project;
