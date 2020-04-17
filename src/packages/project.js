import moment from 'moment'; /* eslint import/no-unresolved: [2, { ignore: ['\moment'] }] */
import {
  DOMCreateProject,
} from './domManipulation';

const projectProto = (name, initial = null) => {
  const id = moment().format('MM Do YY, h:mm:ss a');
  const create = () => DOMCreateProject(name, initial, id);
  const todos = [];
  return {
    create, name, todos, id, initial,
  };
};

const project = (name, initial) => Object.create(projectProto(name, initial));

export default project;
