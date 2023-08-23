
const favorCatBox = document.querySelector('.favorites__categories-list');
const favorGallBox = document.querySelector('.favorites__gallery-list');

getFromLocalStorage()

let test = '6462a8f74c3d0ddd28897fc1';


function getFromLocalStorage() {
    
    for (let key in localStorage) {
        

    if (key.length >= 24) {
          
      try {
          const value = localStorage.getItem(key);
          const parsedValue = JSON.parse(value);
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
            <button class="favorites__card-heart" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="favorites__svg-heart" data-id="${parsedValue._id}">
        <path class="favorites__svg-path" data-id="${parsedValue._id}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10.994 4.708C9.162 2.565 6.105 1.988 3.81 3.95c-2.296 1.962-2.62 5.242-.816 7.563 1.5 1.929 6.037 5.998 7.524 7.315.166.147.25.221.346.25a.464.464 0 0 0 .262 0c.097-.029.18-.103.347-.25 1.487-1.317 6.025-5.386 7.524-7.315 1.803-2.32 1.52-5.622-.816-7.563-2.336-1.942-5.353-1.386-7.186.757Z"
            clip-rule="evenodd" />
        </svg>
        </button>
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

// const favHeartBtn = document.querySelector('.favorites__gallery-list');
// favHeartBtn.addEventListener('click', removeFromLocalStorageFavorites);

function removeFromLocalStorageFavorites(event) {
  if (event.target.tagName !== 'path') return
  console.log(event.target.dataset.id)
  event.target.classList.toggle('heart-svg-bg');
  const currentHeartId = event.target.dataset.id;
  console.log(currentHeartId)
}










































// function getFromLocalStorage() {
    
//   try {
          
//         for (let key in localStorage) {
//         const value = localStorage.getItem(key);
//         const parsedValue = JSON.parse(value);
//       if (typeof parsedValue === 'object' && parsedValue !== null && 'preview' in parsedValue) {
        
//         const notAtended = document.querySelector('.favorites__not-atendent');
//           const catList = document.querySelector('.favorites__categories-list');
//           catList.classList.remove('is-hidden');
//           notAtended.classList.add('is-hidden');
//             const favoriteCard = `<li class="favorites__gallery-list-item">
//           <div class="favorites__card">
//             <img src="${parsedValue.preview}" alt="${parsedValue.title}" class="favorites__card-image">
//             <div class="favorites__card-info">
//               <h2 class="favorites__card-tittle">${parsedValue.title}</h2>
//               <p class="favorites__card-description">${parsedValue.description}</p>
//               <button class="favorites__card-btn">card test</button>
//             </div>
//             <button class="favorites__card-heart" type="button">
//         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" class="favorites__svg-heart" data-id="${parsedValue._id}">
//         <path class="favorites__svg-path" data-id="${parsedValue._id}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//             d="M10.994 4.708C9.162 2.565 6.105 1.988 3.81 3.95c-2.296 1.962-2.62 5.242-.816 7.563 1.5 1.929 6.037 5.998 7.524 7.315.166.147.25.221.346.25a.464.464 0 0 0 .262 0c.097-.029.18-.103.347-.25 1.487-1.317 6.025-5.386 7.524-7.315 1.803-2.32 1.52-5.622-.816-7.563-2.336-1.942-5.353-1.386-7.186.757Z"
//             clip-rule="evenodd" />
//         </svg>
//         </button>
//           </div>
//         </li>`;
          
//           const category = `<li class="favorites__categories-item">
//           <button type="button" class="favorites__categories-btn">${parsedValue.category}</button>
//           </li>`;
            
//           favorGallBox.insertAdjacentHTML('beforeend', favoriteCard);
//           favorCatBox.insertAdjacentHTML('beforeend', category);

//       }
      
//       }

//       } catch (error) {
//           console.log(`Key: ${key}, Error parsing value: `, error);
//       }
  
// }









