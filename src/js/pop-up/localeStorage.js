function setToLocalStorage(key, value) {
    try {
        const recipeValue = JSON.stringify(value);
        localStorage.setItem(key, recipeValue);
    } catch (error) {
        console.error('Set error: ', error.message);
    }
}

function getFromLocalStorage(key) {
    try {
        const recipeValue = localStorage.getItem(key);
        return recipeValue === null ? undefined : JSON.parse(recipeValue);
    } catch (error) {
        console.error('Get error: ', error.message);
    }
}

export { setToLocalStorage, getFromLocalStorage };
