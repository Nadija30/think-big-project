import { getCategories } from "./search-api";
import { getCardByID } from "./search-api"



const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');
const cardsFromMainBox = document.querySelector('.js-cards')

// cardsFromMainBox.addEventListener('click', addToLocalStorage);
// console.log(cardsFromMainBox)




function getFromLocalStorage() {
    
    for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key);

        try {
            const parsedValue = JSON.parse(value);
            console.log(`Key: ${key}, Value: `, parsedValue);
            console.log(parsedValue.preview)
        //     const favoriteCard = `<li class="favorites__gallery-list-item">
        //   <div class="favorites__card">
        //     <img src="${parsedValue.preview}" alt="${key}" class="favorites__card-image">
        //     <div class="favorites__card-info">
        //       <h2 class="favorites__card-tittle">${parsedValue.title}</h2>
        //       <p class="favorites__card-description">${parsedValue.description}</p>
        //       <button class="favorites__card-btn">card test</button>
        //     </div>
        //     <div class="favorites__card-heart"></div>
        //   </div>
        // </li>`;
            
            // favorGallBox.insertAdjacentHTML('beforeend', favoriteCard)
        } catch (error) {
            console.error(`Key: ${key}, Error parsing value: `, error);
        }
    }
}
}

getFromLocalStorage()


















// const categoriesArray = [];



// getCategories().then(response => {
    
//     response.map(item => {
//         categoriesArray.push(`<button class="favorites__categories-btn" type="button">${item.name}</button>`);
//   });
    
// });

// const favorCat = categoriesArray.join('')

// console.log(favorCat);








