import { addTodo } from './board';
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

const displayMessage = (msg, type) => {
  const div = DOMcreate('div', 'messages');
  div.classList.add(type);
  const h2 = DOMcreate('h3');
  h2.innerText = msg;
  div.append(h2);
  document.querySelector('.board').prepend(div);
  dismissMessages();
};

const displayTodoForm = (target) => {
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
    let parent = target.parentNode.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, target.parentNode);
    let localS = getLocalStorage();
    localS.forEach(project => {
      if(project.id === projectId) {
        project.todos[index].status = !project.todos[index].status;
      }
    })
    target.innerText = target.innerText === 'Done'  ? 'Undo' : 'Done' 
    updateData(localS);
  }
}

const displayTodos = (target) => {
  if (target.classList.contains('check-btn')) {
    const id = target.parentNode.previousElementSibling.innerHTML;
    projectId = id;
    let localS = getLocalStorage();
    let todos;
    localS.forEach(project => {
      if(project.id === id) {
        todos = project.todos;
      }
    })
    let html = map(todos);
    document.querySelector('.right').innerHTML = html;
  }
}

const map = (todos) => {
  return todos.map(todo => `
    <div class="todo-details">
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <small>${todo.priority}</small>
      <strong>${todo.dueDate}</strong>
      <button class="todo-status">${todo.status ? 'Done' : 'Undo'}</button>
    </div>
  
  `).join('');
}

const displayProjects = (projects) => {
  const html = projects.map((project) => `
  <div class="project">
    <h2 class="project-title">${project.name}t</h2>
    <h3 class="date">${project.id}</h3>
    <div class="buttons">
      <button class="create-btn">delete</button>
      <button class="add-btn">add</button>
      <button class="check-btn">check</button>
    </div>
  </div>
  `).join('');
  document.querySelector('.board').innerHTML += html;
};

const dismissMessages = () => {
  setTimeout(() => {
    document.querySelector('.messages').remove();
  }, 2000);
};

export {
  DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects, displayTodoForm, displayTodos, toggleTodoStatus
};
