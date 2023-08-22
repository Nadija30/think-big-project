import { setToLocalStorage, getFromLocalStorage } from './localeStorage';
import { getArrayRecipeByID } from './getDataRecipeByID';
import { recipeID } from '../pop-up-modal';

const addToFavoriteBtn = document.querySelector('.pop-up-btn-add');

// addToFavoriteBtn.addEventListener('click', onAddFavoriteBtnClick);

const STORAGE_KEY = 'favorite-list';
let objectRecipes = [];
let arrayIDs = [];

function checkRecipeInStorage() {
    switchAddBtn();
    checkContentsStorage();

    if (arrayIDs.includes(recipeID)) {
        switchRemoveBtn();
    }
}

async function onAddFavoriteBtnClick() {
    checkContentsStorage();

    if (arrayIDs.includes(recipeID)) {
        onRemoveFavoriteBtnClick();
    } else {
        const objectRecipe = await getArrayRecipeByID(recipeID);
        objectRecipes.push(objectRecipe);
        setToLocalStorage(STORAGE_KEY, objectRecipes);
        switchRemoveBtn();
    }
}

function onRemoveFavoriteBtnClick() {
    const indexRecipe = arrayIDs.indexOf(recipeID);
    objectRecipes.splice(indexRecipe, 1);
    setToLocalStorage(STORAGE_KEY, objectRecipes);
    switchAddBtn();
}

function checkContentsStorage() {
    if (getFromLocalStorage(STORAGE_KEY)) {
        objectRecipes = getFromLocalStorage(STORAGE_KEY);
    }
    arrayIDs = objectRecipes.map(recipeID => recipeID._id);
}

function switchAddBtn() {
    addToFavoriteBtn.textContent = 'Add to favorite';
}

function switchRemoveBtn() {
    addToFavoriteBtn.textContent = 'Remove from favorite';
}

export { checkRecipeInStorage };
