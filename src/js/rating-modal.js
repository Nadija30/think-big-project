import axios from 'axios';
import Notiflix from 'notiflix';
import { recipeID } from './pop-up-modal';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

const refs = {
    ratingModal: document.querySelector(`.backdrop__rating`),
    openRatingModal: document.querySelector(`.pop-up-btn-rating`),
    closeRatingModal: document.querySelector(`.close__rating__btn`),
    ratingForm: document.querySelector(`.rating__form`),
    ratingRadio: document.querySelectorAll(`.rating__radio`),
};

refs.closeRatingModal.addEventListener(`click`, closeRatingModal);
refs.ratingForm.addEventListener(`submit`, submitRating);
refs.openRatingModal.addEventListener(`click`, openRatingModal);

function closeRatingModal() {
    refs.ratingModal.classList.add(`is-hidden`);
}

function openRatingModal() {
    const value = document.querySelector(`.rating__value`);
    refs.ratingRadio.forEach(radio => {
        radio.checked = false;
    });
    refs.ratingForm.reset();
    value.innerHTML = `0.0`;
    initRatings();
    refs.ratingModal.classList.remove(`is-hidden`);
}

export function initRatings() {
    const ratings = document.querySelectorAll(`.rating`);
    let ratingValue, ratingStars;

    ratings.forEach(rating => {
        initRating(rating);
    });

    function initRating(rating) {
        if (rating.classList.contains(`card__rating`)) {
            renderIcons(rating);
        }
        initRatingValues(rating);
        setActiveStars();
        if (rating.classList.contains(`set__rating`)) {
            rating.addEventListener(`change`, setNewValue);
        }
    }

    function initRatingValues(rating) {
        ratingValue = rating.querySelector(`.rating__value`);
        ratingStars = rating.querySelectorAll(`.rating__icon`);
    }

    function setActiveStars(count = Math.floor(ratingValue.innerHTML)) {
        ratingStars.forEach(star => {
            star.classList.remove(`active__star`);
        });
        for (i = 0; i < count; i++) {
            const star = ratingStars[i];
            star.classList.add(`active__star`);
        }
    }

    function setNewValue(e) {
        ratingValue.innerHTML = `${e.target.value}.0`;
        setActiveStars();
    }

    function renderIcons(rating) {
        const starWrap = document.createElement(`div`);

        for (let i = 0; i < 5; i++) {
            const starSvg = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            const starPath = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            );

            starWrap.classList.add(`card__star__wrap`);

            starSvg.setAttribute('viewBox', '0 0 32 32');
            starSvg.setAttribute('width', '18');
            starSvg.setAttribute('height', '18');

            starSvg.classList.add('rating__icon');

            starPath.setAttribute(
                'd',
                'M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z'
            );

            starSvg.appendChild(starPath);
            starWrap.append(starSvg);
        }
        rating.append(starWrap);
    }
}

async function submitRating(e) {
    e.preventDefault();

    const { rating, email } = e.currentTarget;

    const inputValues = {
        rate: Number(rating.value),
        email: email.value,
    };
    if (inputValues.rate === 0) {
        Notiflix.Report.warning(`Oops`, `Need to select some rating`, `Return`);
        return;
    }
    if (inputValues.email.trim() === '') {
        Notiflix.Report.warning(`Oops`, `Need to enter email`, `Return`);
    }

    await axios
        .patch(`${BASE_URL}${recipeID}/rating`, inputValues)
        .then(response => {
            Notiflix.Report.success(
                `Great`,
                `Compeltly add rating for ${response.data.title}`,
                `Return`
            );

            closeRatingModal();
        })
        .catch(error => {
            Notiflix.Notify.failure(`${error.response.data.message}`);
        });
}
