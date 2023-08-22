import { getCardByID } from './search-api';

export function addToLocalStorage(event) {
    if (event.target.tagName !== 'path') return;

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
}
