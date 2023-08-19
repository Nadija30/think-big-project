import Notiflix from 'notiflix';

const popularList = document.querySelector('.popular-list');

fetch('https://tasty-treats-backend.p.goit.global/api/recipes/popular')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const markup = data
            .map(({ description, preview, title, _id }) => `
                <li class="popular-list-item" data-id="${_id}">
                    <img srcset="${preview}" src="${preview}" alt="${title}" class="popular-img" loading="lazy" />
                    <div class="popular-wrapper">
                        <h3 class="popular-text-title">${title}</h3>
                        <p class="popular-description">${description}</p>
                    </div>
                </li>
            `)
            .join('');

        popularList.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
        Notiflix.Notify.Failure('An error occurred: ' + error.message);
    });
