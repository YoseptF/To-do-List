import { DOMcreate, DOMappend } from './domManipulation';

const projectProto = () => {
  const create = () => {
    const item = DOMcreate('div', 'project');
    DOMappend('.board', item);
  };
  return { create };
};

const project = () => Object.create(projectProto());

export default project;
