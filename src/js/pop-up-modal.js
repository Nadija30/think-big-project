import { getDataRecipeByID } from './pop-up/getDataRecipeByID';
import { addToLocalStorageFromModal } from './pop-up/addRecipeToStorage';

export const refs = {
    recipes: document.querySelector('.js-cards'),
    recipeContainer: document.querySelector('.pop-up-container'),
    recipeContainerBtn: document.querySelector('.pop-up-list-btn'),
    popular: document.querySelector('.popular-list'),
    btnClose: document.querySelector('[data-pop-up-btn-close]'),
    backdrop: document.querySelector('[data-pop-up-backdrop]'),
    scrollOnModal: document.querySelector('body'),
};

if (refs.recipes) {
    refs.recipes.addEventListener('click', onBtnOpenClick);
}
if (refs.recipes) {
    refs.recipes.addEventListener('click', onBtnOpenFavoriteClick);
}
if (refs.popular) {
    refs.popular.addEventListener('click', onPopularClick);
}
if (refs.btnClose) {
    refs.btnClose.addEventListener('click', onBtnCloseClick);
}
if (refs.backdrop) {
    refs.backdrop.addEventListener('click', onBackdropClick);
}

if (refs.recipeContainerBtn) {
    refs.recipeContainerBtn.addEventListener(
        'click',
        addToLocalStorageFromModal
    );
}
let recipeID = '';
let videoIframe = '';

// Функція яка відкриває модалку з Popular
function onPopularClick(event) {
    const listItem = event.target.closest('.popular-list-item');

    if (listItem) {
        recipeID = listItem.getAttribute('data-id');

        modalRender(recipeID);
    }
}

// Функція яка відкриває модалку з кнопки See recipe
function onBtnOpenClick(event) {
    if (!event.target.closest('.js-see-recipe')) {
        return;
    }

    // const recipeID = event.target.closest('.js-see-recipe').dataset.id;
    recipeID = event.target.dataset.id;

    modalRender(recipeID);
}

// Функція яка відкриває модалку з кнопки See recipe на Favorite
function onBtnOpenFavoriteClick(event) {
    if (!event.target.closest('.favorites__card-btn')) {
        return;
    }

    // const recipeID = event.target.closest('.js-see-recipe').dataset.id;
    recipeID = event.target.dataset.id;

    modalRender(recipeID);
}

// Функція яка рендерить модалку
function modalRender(ID) {
    getDataRecipeByID(ID);

    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');

    refs.recipeContainer.innerHTML = '';
    refs.recipeContainerBtn.innerHTML = '';
}

// Функція закриття модалки по кнопці CLose
function onBtnCloseClick() {
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-blocked');
    refs.backdrop.classList.add('is-hidden');

    videoIframe = document.querySelector('.pop-up-iframe iframe');
    if (videoIframe) {
        stopVideoOnCloseModal();
    }

    if (location.pathname.includes('Favorites.html')) {
        location.reload();
    }
}

// Функція закриття модалки по бекдропу
function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        onBtnCloseClick();
    }
}

// Функція закриття модалки по натисканню на клавішу Escape
function onEscPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
        onBtnCloseClick();
    }
}

// Функція яка зупиняє відео з модалки якщо вона закривається
function stopVideoOnCloseModal() {
    if (videoIframe) {
        videoIframe.src = '';
    }
}

export { recipeID };
