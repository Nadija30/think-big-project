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
};
const widthOfViewport = window.innerWidth;
const params = {};

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
    // elems.containerCategories.insertAdjacentHTML(
    //     'beforeend',
    //     arrCategories.map(({ name }) => `<button>${name}</button>`).join('')
    // );
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

// elems.inputSearch.addEventListener('input', debounce(handlerSearch, 300));

// function handlerSearch(e) {
//     params.title = `${e.target.value}`;
//     console.log(params);

//     getRecipes(params)
//         .then(data => {
//             console.log(data);
//             // createCards(data);
//         })
//         .catch(error => console.log(error));
// }

function createCards(cards) {
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

elems.containerCategories.addEventListener('click', handlerChooseCat);

function handlerChooseCat(e) {
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

function handlerClearCategory(e) {
    params.category = null;
    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => console.log(error));
}
