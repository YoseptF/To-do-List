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
  // document.querySelector('.board').insertAdjacentElement("afterbegin", div);
};

const displayTodoForm = (target) => {
  console.count('enter');
  if (target.classList.contains('add-btn')) {
    const id = target.parentNode.previousElementSibling;
    const addForm = `
    <form>
      <label for ="title">Title</label>
      <input type="text" id ="title">
      <label for ="description">Description</label>
      <textarea id="description"></textarea>
      <label for ="dueDate">Due Date</label>
      <input type ="date">
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
  }
};

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
  DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects, displayTodoForm,
};
