// import { setToLocalStorage, getFromLocalStorage } from './localeStorage';
// import { getArrayRecipeByID } from './getDataRecipeByID';

import { getCardByID } from '../search-api';

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

    function removeFromLocalStorage(event) {
        const key = JSON.stringify('fav' + event.target.dataset.id);
        localStorage.removeItem(key);
        event.target.innerText = 'Add to favorite';
    }
}

// const addToFavoriteBtn = document.querySelector('.pop-up-btn-add');

// if (addToFavoriteBtn) {
//     addToFavoriteBtn.addEventListener('click', onAddFavoriteBtnClick);
// }

// const STORAGE_KEY = 'favorite-list';
// let objectRecipes = [];
// let arrayIDs = [];

// function checkRecipeInStorage() {
// switchAddBtn();
//     checkContentsStorage();

//     if (arrayIDs.includes(recipeID)) {
// switchRemoveBtn();
//     }
// }

// async function onAddFavoriteBtnClick() {
//     checkContentsStorage();

//     if (arrayIDs.includes(recipeID)) {
//         onRemoveFavoriteBtnClick();
//     } else {
//         const objectRecipe = await getArrayRecipeByID(recipeID);
//         objectRecipes.push(objectRecipe);
//         setToLocalStorage(STORAGE_KEY, objectRecipes);
// switchRemoveBtn();
//     }
// }

// function onRemoveFavoriteBtnClick() {
//     const indexRecipe = arrayIDs.indexOf(recipeID);
//     objectRecipes.splice(indexRecipe, 1);
//     setToLocalStorage(STORAGE_KEY, objectRecipes);
//     switchAddBtn();
// }

// function checkContentsStorage() {
//     if (getFromLocalStorage(STORAGE_KEY)) {
//         objectRecipes = getFromLocalStorage(STORAGE_KEY);
//     }
//     arrayIDs = objectRecipes.map(recipeID => recipeID._id);
// }

// function switchAddBtn() {
//     addToFavoriteBtn.textContent = 'Add to favorite';
// }

// function switchRemoveBtn() {
//     addToFavoriteBtn.textContent = 'Remove from favorite';
// }

// export { checkRecipeInStorage };
