import { getDataRecipeByID } from './pop-up/getDataRecipeByID';
import { checkRecipeInStorage } from './pop-up/addRecipeToStorage';

export const refs = {
    recipes: document.querySelector('.js-cards'),
    recipeContainer: document.querySelector('.pop-up-container'),
    popular: document.querySelector('.popular-list'),
    btnClose: document.querySelector('[data-pop-up-btn-close]'),
    backdrop: document.querySelector('[data-pop-up-backdrop]'),
    scrollOnModal: document.querySelector('body'),
};

// refs.recipes.addEventListener('click', onBtnOpenClick);
// refs.popular.addEventListener('click', onPopularClick);
// refs.btnClose.addEventListener('click', onBtnCloseClick);
// refs.backdrop.addEventListener('click', onBackdropClick);

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

let recipeID = '';

function onPopularClick(event) {
    const listItem = event.target.closest('.popular-list-item');

    if (listItem) {
        const recipeID = listItem.getAttribute('data-id');
        console.log(recipeID);

        onClickRender(recipeID);
    }
}

function onBtnOpenClick(event) {
    if (!event.target.closest('.js-see-recipe')) {
        return;
    }

    // const recipeID = event.target.closest('.js-see-recipe').dataset.id;
    recipeID = event.target.dataset.id;

    onClickRender(recipeID);
}

function onClickRender(ID) {
    getDataRecipeByID(ID);
    checkRecipeInStorage();

    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');

    refs.recipeContainer.innerHTML = '';
}

function stopVideoOnCloseModal() {
    if (videoIframe) {
        videoIframe.src = '';
    }
}

function onBtnCloseClick() {
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-blocked');
    refs.backdrop.classList.add('is-hidden');

    videoIframe = document.querySelector('.pop-up-iframe iframe');
    stopVideoOnCloseModal();
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

export { recipeID };
