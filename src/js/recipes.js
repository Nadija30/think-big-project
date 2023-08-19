import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';

import { getAreas } from './search-api';
import { getIngredients } from './search-api';
import { getRecipes } from './search-api';
import { getCategories } from './search-api';

let widthOfViewport = window.innerWidth;
let pagination = null;
let params = {};

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
    containerPagination: document.querySelector('.js-pages'),
};
const options = {
    totalItems: 80,
    itemsPerPage: 8,
    visiblePages: widthOfViewport < 768 ? 2 : 3,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage:
            '<span class="tui-page-btn tui-is-selected">{{page}}</span>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}"></span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}"></span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>',
    },
};

if (widthOfViewport >= 768 && widthOfViewport < 1280) {
    params.limit = 8;
}

if (widthOfViewport >= 1280) {
    params.limit = 9;
}

elems.formFilters.addEventListener('submit', event => {
    event.preventDefault();
});

// window.addEventListener('resize', debounce(onResize, 600));

// function onResize() {
//     widthOfViewport = window.innerWidth;

//     // const pagination = new Pagination(elems.containerPagination, options);

//     if (widthOfViewport >= 768 && widthOfViewport < 1280) {
//         params.limit = 8;
//     }

//     if (widthOfViewport >= 1280) {
//         params.limit = 9;
//     }

//     getRecipes(params)
//         .then(data => {
//             createCards(data.results);
//         })
//         .catch(error => console.log(error));
// }

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

getRecipes(params)
    .then(data => {
        createCards(data.results);
        createPagination(data);
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

    pagination.reset();

    getRecipes(params)
        .then(data => {
            createCards(data.results);
            createPagination(data);
        })
        .catch(error => console.log(error));
}

elems.selectTime.addEventListener('change', handlerSearchByTime);

function handlerSearchByTime(e) {
    params.time = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);
            createPagination(data);
        })
        .catch(error => console.log(error));
}

elems.selectArea.addEventListener('change', handlerSearchByArea);

function handlerSearchByArea(e) {
    params.area = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);

            createPagination(data);
        })
        .catch(error => console.log(error));
}

elems.selectIngredients.addEventListener('change', handlerSearchByIngredients);

function handlerSearchByIngredients(e) {
    params.ingredient = `${e.target.value}`;

    getRecipes(params)
        .then(data => {
            createCards(data.results);

            createPagination(data);
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

    // const pagination = new Pagination(elems.containerPagination, options);
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

function createPagination(data) {
    options.page = data.page;

    options.totalItems = Number(data.perPage) * Number(data.totalPages);

    options.itemsPerPage = Number(data.perPage);

    pagination = new Pagination(elems.containerPagination, options);

    pagination.on('afterMove', event => {
        options.page = event.page;
        params.page = options.page;

        getRecipes(params)
            .then(data => {
                createCards(data.results);
                options.totalItems =
                    Number(data.perPage) * Number(data.totalPages);
                options.itemsPerPage = Number(data.perPage);
                console.log(options);
                console.log(data);
            })
            .catch(error => console.log(error));
    });
}
