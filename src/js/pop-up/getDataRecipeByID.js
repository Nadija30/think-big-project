import axios from 'axios';

import { createMarkup, createMarkupBtn } from './renderMarkupPopup';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

async function getRecipeByID(recipeID) {
    try {
        const response = await axios.get(`${BASE_URL}${recipeID}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

function getDataRecipeByID(recipeID) {
    getRecipeByID(recipeID)
        .then(data => {
            createMarkup(data);
            createMarkupBtn(data);
        })
        .catch(error => console.log(error));
}

async function getArrayRecipeByID(recipeID) {
    try {
        const data = await getRecipeByID(recipeID);
        return data;
    } catch (error) {
        return console.log(error);
    }
}

export { getDataRecipeByID, getArrayRecipeByID };
