import { Report } from 'notiflix/build/notiflix-report-aio';
import Pagination from 'tui-pagination';

import { getCategories } from './search-api';
import { getCardByID } from './search-api';
import { createCards } from './render-cards';

const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');
const containerPagination = document.querySelector('.js-pages');

function start() {
    // favorCatBox.addEventListener('click', handlerChooseCategor);
    const cardsPerPage = window.innerWidth < 768 ? 9 : 12;

    const options = {
        totalItems: setArr().length,
        itemsPerPage: cardsPerPage,
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

    createCards(setArr(cardsPerPage)[0], favorGallBox);

    createPagination();
    function createPagination() {
        pagination = new Pagination(containerPagination, options);
        pagination.on('afterMove', event => {
            console.log(event.page - 1);
            createCards(setArr(cardsPerPage)[event.page - 1], favorGallBox);
        });
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

function handlerChooseCategor(e) {
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }

    elems.btnAllCategories.classList.remove('bnt-all-cat-is-active');

    createCards(getFromLocalStorage(), favorGallBox);
}

function setArr(cardsPerPage) {
    let arrCards = [];
    let arrPag = [];
    let counter = 0;
    getFromLocalStorage().forEach(elem => {
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

// function getFromLocalStorage() {

//     for (let key in localStorage) {
//         const value = localStorage.getItem(key);
//         const parsedValue = JSON.parse(value);
//     if (typeof parsedValue === 'object' && parsedValue !== null && 'preview' in parsedValue) {

//         try {
//             const notatendetBlock = document.querySelector('.favorites__not-atendent');
//             notatendetBlock.classList.add('is-hidden');
//             const favoriteCard = `<li class="favorites__gallery-list-item">
//           <div class="favorites__card">
//             <img src="${parsedValue.preview}" alt="${key}" class="favorites__card-image">
//             <div class="favorites__card-info">
//               <h2 class="favorites__card-tittle">${parsedValue.title}</h2>
//               <p class="favorites__card-description">${parsedValue.description}</p>
//               <button class="favorites__card-btn">card test</button>
//             </div>
//             <div class="favorites__card-heart"></div>
//           </div>
//         </li>`;

//             favorGallBox.insertAdjacentHTML('beforeend', favoriteCard)
//         } catch (error) {
//             console.error(`Key: ${key}, Error parsing value: `, error);
//         }
//     }
// }
// }

// function getCategoriesFromLS() {
//     for (let key in localStorage) {
//         const value = localStorage.getItem(key);
//         const parsedValue = JSON.parse(value);

//         if (
//             typeof parsedValue === 'object' &&
//             parsedValue !== null &&
//             'preview' in parsedValue
//         ) {
//             try {
//                 // console.log(parsedValue.category);
//             } catch {
//                 console.error(`Key: ${key}, Error parsing value: `, error);
//             }
//         }
//     }
// }

// getFromLocalStorage();
// getCategoriesFromLS();

// arrCards.push([])

//
//
//
//
// getFromLocalStorage().forEach(elem => {
//     counter += 1;

//     crr.push(elem);

//     if (!counter % cardsPerPage) {
//     }
// });

// for (let index = 0; index <= getFromLocalStorage().length; index++) {
//     const element = array[index];
// }
//
// if (!counter % cardsPerPage) {}

//
//
//
//
//
//
