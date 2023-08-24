import { initRatings } from './rating-modal';
import Pagination from 'tui-pagination';
import { Loading } from 'notiflix';

const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');
const categoriesArray = [];

favorCatBox.addEventListener('click', filterCards);
const paginationEl = document.querySelector(`.js-pages`);
const favHeartBtn = document.querySelector('.favorites__gallery-list');

const notAtended = document.querySelector('.favorites__not-atendent');
const catList = document.querySelector('.favorites__categories-list');

let favoriteArr = [];
let pagination = null;

let page = 1;
let cardsPerPage = 12;
let totalPages = 1;

const options = {
    totalItems: 80,
    itemsPerPage: 8,
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

if (window.innerWidth < 728) {
    cardsPerPage = 8;
}

getFromLocalStorage();
renderCards();
initRatings();
// favHeartBtn.addEventListener('click', removeFromLocalStorageFavorites);
renderCategoriesBtn();

function getFromLocalStorage() {
    for (let key in localStorage) {
        if (key.length >= 24 && !key.includes(' ')) {
            try {
                const value = localStorage.getItem(key);
                const parsedValue = JSON.parse(value);
                favoriteArr.push(parsedValue);
                if (!categoriesArray.includes(parsedValue.category)) {
                    categoriesArray.push(parsedValue.category);
                }
            } catch (error) {
                console.log(`Key: ${key}, Error parsing value: `, error);
            }
        }
    }
}

function renderCards(cardsArr = favoriteArr) {
    if (cardsArr.length > 0 && cardsArr.length <= cardsPerPage) {
        totalPages = 1;
        createFavCards(cardsArr);
        createPagination();
        catList.classList.remove('is-hidden');
        notAtended.classList.add('is-hidden');
    }
    if (cardsArr.length > cardsPerPage) {
        totalPages = Math.ceil(cardsArr.length / cardsPerPage);
        pageItems = cardsArr.slice(0, cardsPerPage);
        createFavCards(pageItems);
        createPagination();

        catList.classList.remove('is-hidden');
        notAtended.classList.add('is-hidden');
    } else {
        if (window.innerWidth < 768) {
            const imageBox = document.querySelector('.favorites__image-box');
            const notAtended = document.querySelector(
                '.favorites__not-atendent'
            );
            imageBox.classList.add('is-hidden');
            notAtended.classList.add('favorites__not-atendent-empty');
        }
    }
}

function createFavCards(cards) {
    favorGallBox.innerHTML = '';
    cards.forEach(card => {
        const favoriteCard = `<li class="favorites__gallery-list-item">
                   <div class="favorites__card">
                   <img src="${card.preview}" alt="${card.title}" class="favorites__card-image">
                    <div class="favorites__card-info">
                     <h2 class="favorites__card-tittle">${card.title}</h2>
                      <p class="favorites__card-description">${card.description}</p>
                      <div class="rating card__rating"><p class="rating__value">${card.rating}</p></div>
                      <button class="favorites__card-btn">See recipe</button>
                   </div>
                   <button class="favorites__card-heart" type="button">
               <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="favorites__svg-heart" data-id="${card._id}">
               <path class="favorites__svg-path" data-id="${card._id}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M10.994 4.708C9.162 2.565 6.105 1.988 3.81 3.95c-2.296 1.962-2.62 5.242-.816 7.563 1.5 1.929 6.037 5.998 7.524 7.315.166.147.25.221.346.25a.464.464 0 0 0 .262 0c.097-.029.18-.103.347-.25 1.487-1.317 6.025-5.386 7.524-7.315 1.803-2.32 1.52-5.622-.816-7.563-2.336-1.942-5.353-1.386-7.186.757Z"
                   clip-rule="evenodd" />
               </svg>
               </button>
                 </div>
               </li>`;
        favorGallBox.insertAdjacentHTML('beforeend', favoriteCard);
    });
    initRatings();
}

function createPagination(cardsArr = favoriteArr) {
    if (totalPages === 1) {
        paginationEl.innerHTML = '';
        return;
    }

    options.page = page;

    options.totalItems = cardsArr.length + 1;

    options.itemsPerPage = cardsPerPage;

    pagination = new Pagination(paginationEl, options);

    pagination.on('afterMove', event => {
        options.page = event.page;

        page = options.page;

        Loading.dots('Loading data, please wait...');
        const lastItemIndex = page * cardsPerPage;
        const firstItemIndex = lastItemIndex - cardsPerPage;
        console.log(firstItemIndex);
        console.log(lastItemIndex);
        pageItems = favoriteArr.slice(firstItemIndex, lastItemIndex);
        createFavCards(pageItems, favorGallBox);
        options.totalItems = cardsArr.length + 1;
        options.itemsPerPage = cardsPerPage;

        Loading.remove();
    });
}

function renderCategoriesBtn() {
    const renderArray = categoriesArray
        .map(item => {
            return `<li class="favorites__categories-item">
          <button type="button" class="favorites__categories-btn">${item}</button>
          </li>`;
        })
        .join('');

    favorCatBox.insertAdjacentHTML('beforeend', renderArray);
}

function filterCards(event) {
    pageItems = favoriteArr.filter(
        card => card.category === event.target.textContent
    );
    renderCards(pageItems);
}

// const favHeartBtn = document.querySelector('.favorites__gallery-list');
// favHeartBtn.addEventListener('click', removeFromLocalStorageFavorites);

// function removeFromLocalStorageFavorites(event) {
//     if (event.target.tagName !== 'path') { return };
//     event.target.classList.toggle('heart-svg-bg');
//     const currentHeartId = event.target.dataset.id;
//     console.log(currentHeartId);
// }
