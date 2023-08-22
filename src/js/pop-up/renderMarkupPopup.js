import { refs } from '../pop-up-modal';
import { initRatings } from '../rating-modal';

async function createMarkup(recipe) {
    const {
        youtube,
        title,
        thumb,
        tags,
        rating,
        time,
        ingredients,
        instructions,
    } = recipe;

    // const link = `${youtube}`;
    // const id = link.split('=')[1];

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
                <li class="pop-up-item-tag">#${tag}</li>`
        )
        .join('');

    try {
        const response = await fetch(
            `https://www.youtube.com/oembed?url=${youtube}&format=json`
        );
        if (response.ok) {
            const videoData = await response.json();
            const videoEmbedHtml = videoData.html;

            const markup = `
                <div class="pop-up-main-wrap">
                  <div class="pop-up-iframe">${videoEmbedHtml}</div>
                  <h2 class="pop-up-title">${title}</h2>
                </div>
                <div class="pop-up-info">
                  <div class="pop-up-wrap">          
                    <div class="rating popup__rating"><p class="pop-up-rating rating__value">${rating}</p></div>    
                    <p class="pop-up-time">${time} min</p>
                  </div>
                  <ul class="pop-up-list-ingredient">${ingredientItems}</ul>
                  <ul class="pop-up-list-tags">${tagsItem}</ul>
                  <p class="pop-up-instructions">${instructions}</p>
                </div>
            `;

            refs.recipeContainer.insertAdjacentHTML('beforeend', markup);
            initRatings();
        } else {
            console.error('Error fetching video data');

            const markup = `                
                <div class="pop-up-main-wrap">
                  <div class="pop-up-iframe"><img class="pop-up-image" src="${thumb}"></div>
                  <h2 class="pop-up-title">${title}</h2>
                </div>
                <div class="pop-up-info">
                  <div class="pop-up-wrap">          
                    <div class="rating popup__rating"><p class="pop-up-rating rating__value">${rating}</p></div>    
                    <p class="pop-up-time">${time} min</p>
                  </div>
                  <ul class="pop-up-list-ingredient">${ingredientItems}</ul>
                  <ul class="pop-up-list-tags">${tagsItem}</ul>
                  <p class="pop-up-instructions">${instructions}</p>
                </div>
            `;
            refs.recipeContainer.insertAdjacentHTML('beforeend', markup);
            initRatings();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export { createMarkup };
