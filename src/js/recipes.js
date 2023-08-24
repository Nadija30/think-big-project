import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { getAreas } from './search-api';
import { getIngredients } from './search-api';
import { getRecipes } from './search-api';
import { getCategories } from './search-api';
import { addToLocalStorage } from './send-to-is';
import { createCards } from './render-cards';

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
    btnResetInput: document.querySelector('.js-btn-search-reset'),
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
            '<a href="#" class="tui-page-btn tui-is-active tui-{{type}}">' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>',
    },
};

elems.containerCards.addEventListener('click', addToLocalStorage);

if (widthOfViewport >= 768 && widthOfViewport < 1280) {
    params.limit = 8;
}

if (widthOfViewport >= 1280) {
    params.limit = 9;
}

elems.formFilters.addEventListener('submit', event => {
    event.preventDefault();
});

Loading.dots('Loading data, please wait...');

getCategories()
    .then(data => {
        createCategories(data);
    })
    .catch(error => {
        Report.failure(`${error.code}`, `${error.message}`, 'Okay');
    })
    .finally(Loading.remove());

getAreas()
    .then(data => {
        createOptionsAreas(data.filter(area => area.name != 'Unknown'));
        new SlimSelect({
            select: '#area',
            settings: {
                placeholderText: 'Region',
                allowDeselect: true,
                showSearch: false,
            },
        });
    })
    .catch(error => {
        Report.failure(`${error.code}`, `${error.message}`, 'Okay');
    })
    .finally(Loading.remove());

getIngredients()
    .then(data => {
        createOptionsIngredients(data);
        new SlimSelect({
            select: '#ingredients',
            settings: {
                placeholderText: 'Product',
                allowDeselect: true,
                showSearch: false,
            },
        });
    })
    .catch(error => {
        Report.failure(`${error.code}`, `${error.message}`, 'Okay');
    })
    .finally(Loading.remove());

createOptionsTime();

getRecipes(params)
    .then(data => {
        createCards(data.results, elems.containerCards);
        createPagination(data);
    })
    .catch(error => {
        Report.failure(`${error.code}`, `${error.message}`, 'Okay');
    })
    .finally(Loading.remove());

function createCategories(arrCategories) {
    elems.containerCategories.innerHTML = arrCategories
        .map(
            ({ name }) =>
                `<li><button class="js-btn-cat btn-categories">${name}</button></li>`
        )
        .join('');
}

function createOptionsAreas(arrAreas) {
    const markup = [
        '<option data-placeholder="true"></option>',
        ...arrAreas.map(({ name }) => `<option value=${name}>${name}</option>`),
    ];

    elems.selectArea.innerHTML = markup.join('');
}

function createOptionsIngredients(arrIngredients) {
    const markup = [
        '<option data-placeholder="true"></option>',
        ...arrIngredients.map(
            ({ _id, name }) => `<option value=${_id}>${name}</option>`
        ),
    ];

    elems.selectIngredients.innerHTML = markup.join('');
}

function createOptionsTime() {
    const markup = ['<option data-placeholder="true"></option>'];

    for (let i = 5; i <= 160; i += 5) {
        markup.push(`<option value=${i}>${i}</option>`);
    }

    elems.selectTime.innerHTML = markup.join('');

    new SlimSelect({
        select: '#time',
        settings: {
            placeholderText: '0 min',
            allowDeselect: true,
            showSearch: false,
        },
    });
}

elems.inputSearch.addEventListener('input', debounce(handlerSearch, 300));
function handlerSearch(e) {
    params.title = `${e.target.value}`;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.inputSearch.addEventListener('input', handlerDisplayResetBtn);
function handlerDisplayResetBtn(e) {
    if (!e.target.value) {
        elems.btnResetInput.classList.add('is-hidden');
        return;
    }
    elems.btnResetInput.classList.remove('is-hidden');
}

elems.btnResetInput.addEventListener('click', handlerSearchReset);
function handlerSearchReset() {
    elems.inputSearch.value = '';

    params.title = elems.inputSearch.value;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());

    elems.btnResetInput.classList.add('is-hidden');
}

elems.selectTime.addEventListener('change', handlerSearchByTime);
function handlerSearchByTime(e) {
    params.time = `${e.target.value}`;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.selectArea.addEventListener('change', handlerSearchByArea);
function handlerSearchByArea(e) {
    params.area = `${e.target.value}`;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);

            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.selectIngredients.addEventListener('change', handlerSearchByIngredients);
function handlerSearchByIngredients(e) {
    params.ingredient = `${e.target.value}`;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.containerCategories.addEventListener('click', handlerChooseCategory);
function handlerChooseCategory(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    params.category = e.target.textContent;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.btnAllCategories.addEventListener('click', handlerClearCategory);
function handlerClearCategory() {
    params.category = '';

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}
elems.btnResetFilters.addEventListener('click', hanlerClearFilters);
function hanlerClearFilters() {
    document.querySelector('.js-form-filter').reset();

    params = {};
    if (widthOfViewport >= 768 && widthOfViewport < 1280) {
        params.limit = 8;
    }
    if (widthOfViewport >= 1280) {
        params.limit = 9;
    }

    elems.formFilters.reset();

    [...document.querySelectorAll('[data-placeholder="true"]')].map(opt => {
        opt.setAttribute('Selected', 'true');
    });

    document
        .querySelector('[data-placeholder="true"]')
        .setAttribute('Selected', 'true');

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results, elems.containerCards);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

function createPagination(data) {
    if (data.totalPages === 1 || !data.totalPages) {
        elems.containerPagination.innerHTML = '';
        return;
    }

    options.page = data.page;

    options.totalItems = Number(data.perPage) * Number(data.totalPages);

    options.itemsPerPage = Number(data.perPage);

    pagination = new Pagination(elems.containerPagination, options);

    pagination.on('afterMove', event => {
        options.page = event.page;

        params.page = options.page;

        Loading.dots('Loading data, please wait...');

        getRecipes(params)
            .then(data => {
                createCards(data.results, elems.containerCards);
                options.totalItems =
                    Number(data.perPage) * Number(data.totalPages);
                options.itemsPerPage = Number(data.perPage);
            })
            .catch(error => {
                Report.failure(`${error.code}`, `${error.message}`, 'Okay');
            })
            .finally(Loading.remove());
    });
}
