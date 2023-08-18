// import axios from 'axios';
import debounce from 'lodash.debounce';
const cat = 'Beef';
import { getAreas } from './search-api';
import { getIngredients } from './search-api';

const elems = {
    inputSearch: document.querySelector('[name="search"]'),
    selectTime: document.querySelector('[name="time"]'),
    selectArea: document.querySelector('[name="area"]'),
    selectIngredients: document.querySelector('[name="ingredients"]'),
};
const widthOfViewport = window.innerWidth;
const params = {};

getAreas()
    .then(data => {
        createOptionsAreas(data);
    })
    .catch(error => console.log(error));

getIngredients()
    .then(data => {
        createOptionsIngredients(data);
    })
    .catch(error => console.log(error));

createOptionsTime();

function createOptionsAreas(arrAreas) {
    elems.selectArea.insertAdjacentHTML(
        'beforeend',
        arrAreas
            .map(({ name }) => `<option value=${name}>${name}</option>`)
            .join('')
    );
}

function createOptionsIngredients(arrIngredients) {
    elems.selectIngredients.insertAdjacentHTML(
        'beforeend',
        arrIngredients
            .map(({ _id, name }) => `<option value=${_id}>${name}</option>`)
            .join('')
    );
}

function createOptionsTime() {
    const markup = [];

    for (let i = 5; i <= 160; i += 5) {
        markup.push(`<option value=${i}>${i}</option>`);
    }

    elems.selectTime.insertAdjacentHTML('beforeend', markup.join(''));
}

elems.inputSearch.addEventListener('input', debounce(handlerSearch, 300));

function handlerSearch(e) {
    const a = e.target.value;
    console.log(a);
}
