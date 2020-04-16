import { getLocalStorage, updateData } from './localStorage';

let projectId;

const DOMappend = (selector, item) => {
  document.querySelector(selector).append(item);
};

const DOMcreate = (tag, className = '') => {
  const elem = document.createElement(tag);
  if (className) elem.classList.add(className);
  return elem;
};

const DOMListener = (selector, event, func) => {
  document.querySelector(selector).addEventListener(event, (e) => func(e));
};

const dismissMessages = () => {
  setTimeout(() => {
    document.querySelector('.messages').remove();
  }, 2000);
};

const displayMessage = (msg, type) => {
  const div = DOMcreate('div', 'messages');
  div.classList.add(type);
  const h2 = DOMcreate('h3');
  h2.innerText = msg;
  div.append(h2);
  document.querySelector('body').prepend(div);
  dismissMessages();
};

const displayTodoForm = (target, addTodo) => {
  if (target.classList.contains('add-btn')) {
    const id = target.parentNode.previousElementSibling.innerHTML;
    const addForm = `
    <form id="todo-form">
      <label for ="title">Title</label>
      <input type="text" id ="title">
      <label for ="description">Description</label>
      <textarea id="description"></textarea>
      <label for ="dueDate">Due Date</label>
      <input type ="date" id="dueDate">
      <label for ="priority">Priority</label>
      <select name="Select" id="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="submit" value="Create Todo">
    </form>
    `;
    document.querySelector('.right').innerHTML = addForm;
    document.querySelector('#todo-form').addEventListener('submit', (e) => addTodo(e, id));
  }
};

const toggleTodoStatus = (target) => {
  if (target.classList.contains('todo-status')) {
    const parent = target.parentNode.parentNode.parentNode;
    const child = target.parentNode.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, child);
    const localS = getLocalStorage();
    localS.forEach((project) => {
      if (project.id === projectId) {
        const buffer = project;
        buffer.todos[index].status = !buffer.todos[index].status;
      }
    });
    const buffer = target;
    buffer.innerHTML = target.innerHTML === 'Done' ? 'Undo' : 'Done';
    updateData(localS);
  }
};

const map = (todos) => todos.map((todo) => `
    <tr class="todo-details">
      <td>${todo.title}</td>
      <td>${todo.description}</td>
      <td>${todo.priority}</td>
      <td>${todo.dueDate}</td>
      <td><button class="todo-status">${todo.status ? 'Done' : 'Undo'}</button></td>
      <td><button class="todo-delete">Delete</button></td>
    </tr>
  
  `).join('');

const displayTodos = (target) => {
  if (target.classList.contains('check-btn')) {
    const id = target.parentNode.previousElementSibling.innerHTML;
    projectId = id;
    const localS = getLocalStorage();
    let todos;
    localS.forEach((project) => {
      if (project.id === id) {
        todos = project.todos;
      }
    });
    const html = map(todos);

    const titlesRow = `
    <tr class ="titlesRow">
      <th>Title</th>
      <th>Description</th>
      <th>Priority</th>
      <th>Due date</th>
      <th>Status</th>
    </tr>
    `;

    const table = `
    <table style="width:100%">
    <thead>
    ${titlesRow}
    </thead>
    <tbody>
    ${html}
    </tbody>
    </table>
    `;
    document.querySelector('.right').innerHTML = table;
  }
};

const displayProjects = (projects) => {
  const html = projects.map((project) => `
  <div class="project">
    <h2 class="project-title">${project.name}t</h2>
    <h3 class="date">${project.id}</h3>
    <div class="buttons">
      <button class="delete-btn">delete</button>
      <button class="add-btn">add</button>
      <button class="check-btn">check</button>
    </div>
  </div>
  `).join('');
  document.querySelector('.board').innerHTML += html;
};

const deleteProject = (target) => {
  if (target.classList.contains('delete-btn')) {
    const id = target.parentNode.previousElementSibling.innerHTML;
    const thisProject = target.parentNode.parentNode;
    const localS = getLocalStorage();
    for (let i = 0; i < localS.length; i += 1) {
      if (localS[i].id === id) {
        localS.splice(i, 1);
        break;
      }
    }
    updateData(localS);
    thisProject.remove();
    document.querySelector('.right').innerHTML = '';
  }
};

const deleteTodo = (target) => {
  if (target.classList.contains('todo-delete')) {
    const parent = target.parentNode.parentNode;
    const localS = getLocalStorage();
    localS.forEach((project, ind) => {
      if (project.id === projectId) {
        project.todos.splice(ind, 1);
      }
    });
    parent.remove();
    updateData(localS);
  }
};

export {
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
};
