const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');

getFromLocalStorage()

function getFromLocalStorage() {
    
    for (let key in localStorage) {
        const value = localStorage.getItem(key);
        const parsedValue = JSON.parse(value);
    if (typeof parsedValue === 'object' && parsedValue !== null && 'preview' in parsedValue) {
        
        try {
          const notAtended = document.querySelector('.favorites__not-atendent');
          const catList = document.querySelector('.favorites__categories-list');
          catList.classList.remove('is-hidden');
          notAtended.classList.add('is-hidden');
            const favoriteCard = `<li class="favorites__gallery-list-item">
          <div class="favorites__card">
            <img src="${parsedValue.preview}" alt="${parsedValue.title}" class="favorites__card-image">
            <div class="favorites__card-info">
              <h2 class="favorites__card-tittle">${parsedValue.title}</h2>
              <p class="favorites__card-description">${parsedValue.description}</p>
              <button class="favorites__card-btn">card test</button>
            </div>
            <div class="favorites__card-heart"><svg class="favorite__heart-svg">
            <use href="./img/icons.svg#icon-heart"></use>
            </svg></div>
          </div>
        </li>`;
          
          const category = `<li class="favorites__categories-item">
          <button type="button" class="favorites__categories-btn">${parsedValue.category}</button>
          </li>`;
            
          favorGallBox.insertAdjacentHTML('beforeend', favoriteCard);
          favorCatBox.insertAdjacentHTML('beforeend', category);
        } catch (error) {
            console.log(`Key: ${key}, Error parsing value: `, error);
        }
    }
}
}

























// const categoriesArray = [];



// getCategories().then(response => {
    
//     response.map(item => {
//         categoriesArray.push(`<button class="favorites__categories-btn" type="button">${item.name}</button>`);
//   });
    
// });

// const favorCat = categoriesArray.join('')

// console.log(favorCat);








