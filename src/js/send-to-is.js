import { getCardByID } from './search-api';

// const cardsBox = document.querySelector('.js-cards');

// cardsBox.addEventListener('click', addToLocalStorage);

export function addToLocalStorage(event) {
    if (event.target.tagName !== 'path') return;

    console.log(event.target);

    const dataIdValue = event.target.getAttribute('data-id');

    getCardByID(dataIdValue).then(data => {
        const cardPreview = {
            title: data.title,
            description: data.description,
            preview: data.preview,
            id: data._id,
            category: data.category,
        };

        const cardPreviewJSON = JSON.stringify(cardPreview);

        localStorage.setItem(`${data.title}`, cardPreviewJSON);
    });
}
