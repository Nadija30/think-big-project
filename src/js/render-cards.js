import { initRatings } from './rating-modal';
import { getDataFromLocalStorage } from './local-storage-api';

export function createCards(cards, container) {
    if (!cards.length) {
        container.innerHTML =
            '<p>Nothing was found for your request. Try changing your search parameters...</p>';
        return;
    }

    container.innerHTML = cards
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
    background-size: cover;"><button class="heart js-btn-heart" data-id="${_id}"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="icon-heart" data-id="${_id}">
    <path class="heart-svg-path" data-id="${_id}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.994 4.708C9.162 2.565 6.105 1.988 3.81 3.95c-2.296 1.962-2.62 5.242-.816 7.563 1.5 1.929 6.037 5.998 7.524 7.315.166.147.25.221.346.25a.464.464 0 0 0 .262 0c.097-.029.18-.103.347-.25 1.487-1.317 6.025-5.386 7.524-7.315 1.803-2.32 1.52-5.622-.816-7.563-2.336-1.942-5.353-1.386-7.186.757Z" clip-rule="evenodd"/>
    </svg></button><h3 class="title-card-rec">${title}</h3>
    <p class="text-card-rec"><span class="text-wrap">${description}</span></p>
    <div class="thumb-rating-btn-see"><div class="rating card__rating"><p class="rating__value card-rating-main">${rating}</p></div>
    <button class="js-see-recipe btn-see-recipe" data-id="${_id}">See recipe</button></div>    
    </div>`
        )
        .join('');

    initRatings();

    console.log(getDataFromLocalStorage());

    document.querySelectorAll('.icon-heart').forEach(icon => {
        if (icon) {
            getDataFromLocalStorage()
                .map(favorite => favorite._id)
                .forEach(favId => {
                    if (favId === icon.dataset.id) {
                        icon.classList.add('icon-heart-active');
                    }
                });
        }
    });
}
