import debounce from 'lodash.debounce';
import Pagination from 'tui-pagination';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { getAreas } from './search-api';
import { getIngredients } from './search-api';
import { getRecipes } from './search-api';
import { getCategories } from './search-api';

import { initRatings } from './rating-modal';

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
        createOptionsAreas(data);
        new SlimSelect({
            select: '#area',
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
        });
    })
    .catch(error => {
        Report.failure(`${error.code}`, `${error.message}`, 'Okay');
    })
    .finally(Loading.remove());

createOptionsTime();

getRecipes(params)
    .then(data => {
        createCards(data.results);
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

    new SlimSelect({
        select: '#time',
    });
}

elems.inputSearch.addEventListener('input', debounce(handlerSearch, 600));

function handlerSearch(e) {
    params.title = `${e.target.value}`;

    pagination.reset();

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results);
            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.selectTime.addEventListener('change', handlerSearchByTime);

function handlerSearchByTime(e) {
    params.time = `${e.target.value}`;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results);
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
            createCards(data.results);

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
            createCards(data.results);

            createPagination(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

function createCards(cards) {
    if (!cards.length) {
        elems.containerCards.innerHTML =
            '<p>Nothing was found for your request. Try changing your search parameters...</p>';
        return;
    }

    elems.containerCards.innerHTML = cards
        .map(
            ({
                preview,
                title,
                description,
                rating,
                _id,
            }) => `<div class="wrap-card-container" style="background: linear-gradient(
            1deg,
            rgba(5, 5, 5, 0.6) 0%,
            rgba(5, 5, 5, 0) 100%
        ),
        url(${preview});
    background-repeat: no-repeat;
    background-size: cover;"><button class="heart js-btn-heart" data-id="${_id}"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="icon-heart">
    <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.994 4.708C9.162 2.565 6.105 1.988 3.81 3.95c-2.296 1.962-2.62 5.242-.816 7.563 1.5 1.929 6.037 5.998 7.524 7.315.166.147.25.221.346.25a.464.464 0 0 0 .262 0c.097-.029.18-.103.347-.25 1.487-1.317 6.025-5.386 7.524-7.315 1.803-2.32 1.52-5.622-.816-7.563-2.336-1.942-5.353-1.386-7.186.757Z" clip-rule="evenodd"/>
    </svg></button><h3 class="title-card-rec">${title}</h3>
    <p class="text-card-rec"><span class="text-wrap">${description}</span></p>
    <div class="thumb-rating-btn-see"><div class="rating card__rating"><p class="rating__value card-rating-main">${rating}</p></div>
    <button class="js-see-recipe btn-see-recipe" data-id="${_id}">See recipe</button></div>    
    </div>`
        )
        .join('');

    initRatings();
}

elems.containerCategories.addEventListener('click', handlerChooseCategory);

function handlerChooseCategory(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    elems.btnAllCategories.classList.remove('bnt-all-cat-is-active');

    params.category = e.target.textContent;

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

elems.btnAllCategories.addEventListener('click', handlerClearCategory);

function handlerClearCategory() {
    params.category = '';

    elems.btnAllCategories.classList.add('bnt-all-cat-is-active');

    Loading.dots('Loading data, please wait...');

    getRecipes(params)
        .then(data => {
            createCards(data.results);
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

    Loading.dots('Loading data, please wait...');

    getRecipes()
        .then(data => {
            createCards(data.results);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        })
        .finally(Loading.remove());
}

function createPagination(data) {
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
                createCards(data.results);
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

// import { getCardByID } from './search-api';
// const id = '6462a8f74c3d0ddd28897fbc';
// getCardByID(id).then(data => {
//     console.log(data);
// });
