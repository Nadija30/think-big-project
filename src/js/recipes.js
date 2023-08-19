// import axios from 'axios';
import debounce from 'lodash.debounce';
const cat = 'Beef';
import { getAreas } from './search-api';
import { getIngredients } from './search-api';
import { getRecipes } from './search-api';
import { getCategories } from './search-api';

const elems = {
    inputSearch: document.querySelector('[name="search"]'),
    selectTime: document.querySelector('[name="time"]'),
    selectArea: document.querySelector('[name="area"]'),
    selectIngredients: document.querySelector('[name="ingredients"]'),
    containerCards: document.querySelector('.js-cards'),
    containerCategories: document.querySelector('.js-btn-categories'),
    btnAllCategories: document.querySelector('.js-btn-all-cat'),
    btnResetFilters: document.querySelector('.js-btn-reset-filters'),
    formFilters: document.querySelector('.js-form-filter'),
};
const widthOfViewport = window.innerWidth;
let params = {};

elems.formFilters.addEventListener('submit', event => {
    event.preventDefault();
});

getCategories()
    .then(data => {
        createCategories(data);
    })
    .catch(error => console.log(error));

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

getRecipes()
    .then(data => {
        createCards(data.results);
    })
    .catch(error => console.log(error));

function createCategories(arrCategories) {
    elems.containerCategories.innerHTML = arrCategories
        .map(
            ({ name }) => `<li><button class="js-btn-cat">${name}</button></li>`
        )
        .join('');
}

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

elems.inputSearch.addEventListener('input', debounce(handlerSearch, 600));

function handlerSearch(e) {
    params.title = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}

elems.selectTime.addEventListener('change', handlerSearchByTime);

function handlerSearchByTime(e) {
    params.time = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}

elems.selectArea.addEventListener('change', handlerSearchByArea);

function handlerSearchByArea(e) {
    params.area = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}

elems.selectIngredients.addEventListener('change', handlerSearchByIngredients);

function handlerSearchByIngredients(e) {
    params.ingredient = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}

function createCards(cards) {
    if (!cards.length) {
        elems.containerCards.innerHTML =
            '<p>Nothing was found for your request. Try changing your search parameters...</p>';
        return;
    }

    elems.containerCards.innerHTML = cards
        .map(
            ({ preview, title, description, rating, _id }) => `<img
        src="${preview}"
        alt="${title}"
    />
    <h3>${title}</h3>
    <p>${description}</p>
    <p>${rating}</p>
    <button class="js-see-recipe" data-id="${_id}">See recipe</button>
    <button class="heart js-favorites">&#10084;</button>`
        )
        .join('');
}

elems.containerCategories.addEventListener('click', handlerChooseCategory);

function handlerChooseCategory(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    params.category = e.target.textContent;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}

elems.btnAllCategories.addEventListener('click', handlerClearCategory);

function handlerClearCategory() {
    params.category = '';
    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}
elems.btnResetFilters.addEventListener('click', hanlerClearFilters);

function hanlerClearFilters() {
    document.querySelector('.js-form-filter').reset();

    params = {};

    getRecipes()
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}
