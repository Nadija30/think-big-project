import { Report } from 'notiflix/build/notiflix-report-aio';
import Pagination from 'tui-pagination';

import { getCategories } from './search-api';
import { getCardByID } from './search-api';
import { createCards } from './render-cards';

const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');
const containerPagination = document.querySelector('.js-pages');

function start() {
    favorCatBox.addEventListener('click', handlerChooseCategor);
    // const cardsPerPage = window.innerWidth < 768 ? 9 : 12;

    const options = {
        totalItems: getFromLocalStorage().length,
        itemsPerPage: window.innerWidth < 768 ? 9 : 12,
        visiblePages: window.innerWidth < 768 ? 2 : 3,
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
    let pagination = null;

    getCategories()
        .then(data => {
            createCategor(data);
        })
        .catch(error => {
            Report.failure(`${error.code}`, `${error.message}`, 'Okay');
        });

    createCards(
        setArr(options.itemsPerPage, getFromLocalStorage())[0],
        favorGallBox
    );

    createPagination(getFromLocalStorage());

    function createPagination(array) {
        pagination = new Pagination(containerPagination, options);
        pagination.on('afterMove', event => {
            createCards(
                setArr(options.itemsPerPage, array)[event.page - 1],
                favorGallBox
            );
        });
    }

    function handlerChooseCategor(e) {
        if (e.target.nodeName !== 'BUTTON') {
            return;
        }

        function filterCatFav(category) {
            const arrFiltredCards = getFromLocalStorage().filter(
                element => element.category === category
            );
            return arrFiltredCards;
        }

        options.totalItems = filterCatFav(e.target.textContent).length;

        createCards(
            setArr(options.itemsPerPage, filterCatFav(e.target.textContent))[0],
            favorGallBox
        );

        createPagination(filterCatFav(e.target.textContent));
    }
}

export function getFromLocalStorage() {
    let keysArr = [];
    let cardsArr = [];
    for (const key in localStorage) {
        keysArr.push(key);
    }
    keysArr
        .filter(elArr => elArr.includes('fav'))
        .map(el => {
            cardsArr.push(JSON.parse(localStorage.getItem(el)));
        });

    return cardsArr;
}

function createCategor(arrCategories) {
    favorCatBox.insertAdjacentHTML(
        'beforeend',
        arrCategories
            .map(
                ({ name }) =>
                    `<li><button class="js-btn-class btn-class">${name}</button></li>`
            )
            .join('')
    );
}

if (favorGallBox && favorCatBox) {
    window.onload = start;
}

function setArr(cardsPerPage, array) {
    let arrCards = [];
    let arrPag = [];
    let counter = 0;
    array.forEach(elem => {
        counter += 1;
        arrPag.push(elem);

        if (!(counter % cardsPerPage)) {
            arrCards.push(arrPag);
            arrPag = [];
        }
    });
    arrCards.push(arrPag);
    return arrCards;
}
