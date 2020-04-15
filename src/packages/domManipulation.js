const DOMappend = (selector, item) => {
  document.querySelector(selector).append(item);
};

const DOMcreate = (tag, className = '') => {
  const elem = document.createElement(tag);
  if (className) elem.classList.add(className);
  return elem;
};

export { DOMappend, DOMcreate };
