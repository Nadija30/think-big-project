export function getDataFromLocalStorage() {
    let keysArr = [];
    let cardsArr = [];
    for (const key in localStorage) {
        keysArr.push(key);
    }
    keysArr
        .filter(elArr => elArr.includes('fav'))
        .map(el => {
            cardsArr.push(JSON.parse(localStorage.getItem(el)));
        });

    return cardsArr;
}
