const checkData = () => {
  const data = localStorage.getItem('board');
  return data ? JSON.parse(data) : false;
};

const storeData = (data) => {
  localStorage.setItem(JSON.stringify(data));
};

export { checkData, storeData };
