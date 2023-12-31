import { getCardByID } from '../search-api';
import { recipeID } from '../pop-up-modal';

// Функція яка додає в локальне сховище дані з модалки
export function addToLocalStorageFromModal(event) {
    if (!event.target.className.includes('pop-up-btn-add')) return;

    if (event.target.innerText === 'Remove from favorite') {
        removeFromLocalStorage(event);
        return;
    }

    const dataIdValue = event.target.getAttribute('data-id');

    getCardByID(dataIdValue).then(data => {
        const cardPreview = {
            title: data.title,
            description: data.description,
            preview: data.preview,
            _id: data._id,
            category: data.category,
            rating: data.rating,
        };

        const cardPreviewJSON = JSON.stringify(cardPreview);
        const keyJSON = JSON.stringify('fav' + data._id);
        localStorage.setItem(keyJSON, cardPreviewJSON);
    });

    event.target.innerText = 'Remove from favorite';

    const containerCards = document.querySelector('.js-cards');
    const heartIcon = containerCards.querySelector(
        `.heart [data-id="${recipeID}"]`
    );

    if (!heartIcon) return;
    if (!heartIcon.classList.contains('icon-heart-active')) {
        heartIcon.classList.add('icon-heart-active');
    }

    // Функція яка видаляє з локального сховища дані з модалки
    function removeFromLocalStorage(event) {
        const key = JSON.stringify('fav' + event.target.dataset.id);
        localStorage.removeItem(key);
        event.target.innerText = 'Add to favorite';

        const containerCards = document.querySelector('.js-cards');
        const heartIcon = containerCards.querySelector(
            `.heart [data-id="${recipeID}"]`
        );
        if (!heartIcon) return;
        if (heartIcon.classList.contains('icon-heart-active')) {
            heartIcon.classList.remove('icon-heart-active');
        }
    }
}
