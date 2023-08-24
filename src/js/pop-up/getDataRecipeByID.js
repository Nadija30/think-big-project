import axios from 'axios';

import { createMarkup, createMarkupBtn } from './renderMarkupPopup';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

// Функція яка отримує рецепт за ID через HTTP запит
async function getRecipeByID(recipeID) {
    try {
        const response = await axios.get(`${BASE_URL}${recipeID}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

// Функція яка отримує дані рецепта за ID та рендерить їх
function getDataRecipeByID(recipeID) {
    getRecipeByID(recipeID)
        .then(data => {
            createMarkup(data);
            createMarkupBtn(data);
        })
        .catch(error => console.log(error));
}

export { getDataRecipeByID, getArrayRecipeByID };
