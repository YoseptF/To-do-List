const getLocalStorage = () => {
  let localS;
  if (localStorage.getItem('board') === null) {
    localS = [];
    localStorage.setItem('board', JSON.stringify(localS));
  } else {
    localS = JSON.parse(localStorage.getItem('board'));
  }
  return localS;
}

const updateData = (data) => {
  localStorage.setItem('board',JSON.stringify(data));
};

export { updateData, getLocalStorage };
