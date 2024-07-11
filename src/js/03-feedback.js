import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormChange, 500));
form.addEventListener('submit', onFormSubmit);
let obj = {};

function onFormChange(evt) {
  const nameOfField = evt.target.name;
  const valueOfField = evt.target.value;
  obj[nameOfField] = valueOfField;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}
const savedData = localStorage.getItem(STORAGE_KEY);

function onFormSubmit(evt) {
  evt.preventDefault();
  if (savedData) {
    console.log('obj: ', obj);
  }
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  for (const key in obj) {
    delete obj[key];
  }
}

if (savedData) {
  const parsedData = JSON.parse(savedData);
  const input = form.elements[0];
  const textArea = form.elements[1];

  input.value = parsedData.email || ' ';
  textArea.value = parsedData.message || ' ';

  obj = parsedData;
  console.log('перезаписав: ', obj);
}
