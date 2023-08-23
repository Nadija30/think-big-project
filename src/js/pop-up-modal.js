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
// let recipeID = '';

function onPopularClick(event) {
    const listItem = event.target.closest('.popular-list-item');

    if (listItem) {
        const recipeID = listItem.getAttribute('data-id');

        modalRender(recipeID);
    }
}

function onBtnOpenClick(event) {
    if (!event.target.closest('.js-see-recipe')) {
        return;
    }

    // const recipeID = event.target.closest('.js-see-recipe').dataset.id;
    recipeID = event.target.dataset.id;

    modalRender(recipeID);
}

function modalRender(ID) {
    getDataRecipeByID(ID);

    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');

    refs.recipeContainer.innerHTML = '';
    refs.recipeContainerBtn.innerHTML = '';
}

function onBtnCloseClick() {
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-blocked');
    refs.backdrop.classList.add('is-hidden');

    videoIframe = document.querySelector('.pop-up-iframe iframe');
    if (videoIframe) {
        stopVideoOnCloseModal();
    }
}

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        onBtnCloseClick();
    }
}

function onEscPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
        onBtnCloseClick();
    }
}

function stopVideoOnCloseModal() {
    if (videoIframe) {
        videoIframe.src = '';
    }
}

export { recipeID };
