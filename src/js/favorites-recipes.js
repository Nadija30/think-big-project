import { getCategories } from './search-api';
import { getCardByID } from './search-api';
import { createCards } from './render-cards';

const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');

// function getFromLocalStorage() {

//     for (let key in localStorage) {
//         const value = localStorage.getItem(key);
//         const parsedValue = JSON.parse(value);
//     if (typeof parsedValue === 'object' && parsedValue !== null && 'preview' in parsedValue) {

//         try {
//             const notatendetBlock = document.querySelector('.favorites__not-atendent');
//             notatendetBlock.classList.add('is-hidden');
//             const favoriteCard = `<li class="favorites__gallery-list-item">
//           <div class="favorites__card">
//             <img src="${parsedValue.preview}" alt="${key}" class="favorites__card-image">
//             <div class="favorites__card-info">
//               <h2 class="favorites__card-tittle">${parsedValue.title}</h2>
//               <p class="favorites__card-description">${parsedValue.description}</p>
//               <button class="favorites__card-btn">card test</button>
//             </div>
//             <div class="favorites__card-heart"></div>
//           </div>
//         </li>`;

//             favorGallBox.insertAdjacentHTML('beforeend', favoriteCard)
//         } catch (error) {
//             console.error(`Key: ${key}, Error parsing value: `, error);
//         }
//     }
// }
// }

// function getCategoriesFromLS() {
//     for (let key in localStorage) {
//         const value = localStorage.getItem(key);
//         const parsedValue = JSON.parse(value);

//         if (
//             typeof parsedValue === 'object' &&
//             parsedValue !== null &&
//             'preview' in parsedValue
//         ) {
//             try {
//                 // console.log(parsedValue.category);
//             } catch {
//                 console.error(`Key: ${key}, Error parsing value: `, error);
//             }
//         }
//     }
// }

// getFromLocalStorage();
// getCategoriesFromLS();

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

createCards(cardsArr, favorGallBox);

// const categoriesArray = [];

// getCategories().then(response => {

//     response.map(item => {
//         categoriesArray.push(`<button class="favorites__categories-btn" type="button">${item.name}</button>`);
//   });

// });

// const favorCat = categoriesArray.join('')

// console.log(favorCat);
