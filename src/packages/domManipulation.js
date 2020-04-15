const DOMappend = (selector, item) => {
  document.querySelector(selector).append(item);
};

const DOMcreate = (tag, className = '') => {
  const elem = document.createElement(tag);
  if (className) elem.classList.add(className);
  return elem;
};

const DOMListener = (selector, event, func) => {
  document.querySelector(selector).addEventListener(event, (e) => func(e) )
}

const displayMessage = (msg, type) => {
  let div = DOMcreate('div', 'messages');
  div.classList.add(type);
  let h2 = DOMcreate('h3');
  h2.innerText = msg;
  div.append(h2)
  document.querySelector('.board').prepend(div);
  dismissMessages();
  // document.querySelector('.board').insertAdjacentElement("afterbegin", div);
}

const displayProjects = (projects) => {
  let html = projects.map(project => `
    <div class="project">
      <h2 class="project-title">${project.name}</h2>
    </div>
  `).join('');
  document.querySelector('.board').innerHTML += html;
}

const dismissMessages = () => {
  setTimeout(() => {
    document.querySelector('.messages').remove();
  }, 2000);
}

export { DOMappend, DOMcreate, DOMListener, displayMessage, displayProjects };
