import { getCardByID } from './search-api';

export function addToLocalStorage(event) {
    if (event.target.tagName !== 'path') return;
    if (event.target.parentNode.classList.contains('icon-heart-active')) {
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

    event.target.parentNode.classList.add('icon-heart-active');

    function removeFromLocalStorage(e) {
        const key = JSON.stringify('fav' + e.target.dataset.id);
        localStorage.removeItem(key);
        e.target.parentNode.classList.remove('icon-heart-active');
    }
}
