import { refs } from '../pop-up-modal';

function createMarkup(recipe) {
    const { youtube, title, tags, rating, time, ingredients, instructions } =
        recipe;

    const link = `${youtube}`;
    const id = link.split('=')[1];

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

    const markup = `
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
            `;

    refs.recipeContainer.insertAdjacentHTML('beforeend', markup);
}

export { createMarkup };
