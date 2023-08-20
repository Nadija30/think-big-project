import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const END_POINTS = {
    events: '/events',
    recipes: '/recipes',
    areas: '/areas',
    categories: '/categories',
    ingredients: '/ingredients',
    popular: '/recipes/popular',
};

axios.defaults.baseURL = BASE_URL;

export const getEvents = async () => {
    const response = await axios(`${END_POINTS.events}`);
    return response.data;
};

export const getAreas = async () => {
    const response = await axios(`${END_POINTS.areas}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await axios(`${END_POINTS.categories}`);
    return response.data;
};

export const getIngredients = async () => {
    const response = await axios(`${END_POINTS.ingredients}`);
    return response.data;
};

export const getPopularRecipes = async () => {
    const response = await axios(`${END_POINTS.popular}`);
    return response.data;
};

export const getRecipes = async parametrsOfSearch => {
    const response = await axios(`${END_POINTS.recipes}`, {
        params: parametrsOfSearch,
    });
    return response.data;
};

export const getCardByID = async id => {
    const response = await axios(`${END_POINTS.recipes}/${id}`);
    return response.data;
};
