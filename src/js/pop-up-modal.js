import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

const refs = {
    btnOpen: document.querySelector('[data-pop-up-btn-open]'),
    btnClose: document.querySelector('[data-pop-up-btn-close]'),
    backdrop: document.querySelector('[data-pop-up-backdrop]'),
    scrollOnModal: document.querySelector('body'),
    recipe: document.querySelector('.pop-up-container'),
};

refs.btnOpen.addEventListener('click', onBtnOpenClick);
refs.btnClose.addEventListener('click', onBtnCloseClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onBtnOpenClick(event) {
    const recipeID = event.target.id;

    fetchRecipeByID(recipeID).then(data => {
        console.log(data);

        refs.recipe.insertAdjacentHTML('beforeend', createMarkup(data, 1, 2));
    });

    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');
}

function onBtnCloseClick() {
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-blocked');
    refs.backdrop.classList.add('is-hidden');
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

async function fetchRecipeByID(recipeID) {
    try {
        const response = await axios.get(`${BASE_URL}${recipeID}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

function createMarkup(recipe, addToFavorite, addRatinq) {
    const { youtube, title, tags, rating, time, ingredients, instructions } =
        recipe;

    const link = `${youtube}`;
    const id = link.split('=')[1];
    console.log(id);

    const ingredientItems = ingredients
        .map(
            ingredient => `
                <li class="pop-up-item-ingredient">
                  <span class="pop-up-name">${ingredient.name}</span>
                  <span class="pop-up-measure">${ingredient.measure}</span>
                </li>`
        )
        .join('');

    const tagsItem = tags
        .map(
            tag => `
                <li class="pop-up-item-tag">${tag}</li>`
        )
        .join('');

    return `
            <iframe class="pop-up-iframe"
              src="https://www.youtube.com/embed/${id}?autoplay=0&mute=0&controls=1" width="466" height="250"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
            <h2 class="pop-up-title">${title}</h2>
            <ul class="pop-up-list-tags">
              ${tagsItem}
            </ul>
            <span class="pop-up-rating">${rating}</span>
            <span class="pop-up-time">${time} min</span>
            <ul class="pop-up-list-ingredient">
              ${ingredientItems}
            </ul>
            <p class="pop-up-instructions">${instructions}</p>
            <div class="pop-up-list-btn">
              <button class="pop-up-btn-add">${addToFavorite}</button>
              <button class="pop-up-btn-rating">${addRatinq}</button>
            </div>`;
}
