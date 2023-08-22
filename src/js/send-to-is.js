import { getCardByID } from './search-api';
import { keyFav } from './ls';
import { valueFav } from './ls';

// const cardsBox = document.querySelector('.js-cards');

// cardsBox.addEventListener('click', addToLocalStorage);

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

        // localStorage.setItem(keyFav, JSON.stringify(valueFav));

        // valueFav.push(cardPreview);

        // localStorage.setItem(keyFav, JSON.stringify(valueFav));
        // console.log(localStorage.getItem(keyFav));
        // const keyFav = { _id: data._id };

        const cardPreviewJSON = JSON.stringify(cardPreview);
        const keyJSON = JSON.stringify('fav' + data._id);
        localStorage.setItem(keyJSON, cardPreviewJSON);
        // // const favorites = JSON.parse();
        // console.log(localStorage.getItem(keyFav));
        // localStorage.setItem(`key:`, cardPreviewJSON);
    });
}
