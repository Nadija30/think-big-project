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

initRatings();

function initRatings() {
    const ratings = document.querySelectorAll(`.rating`);
    let ratingValue, ratingStars;

    ratings.forEach(rating => {
        initRating(rating);
    });

    function initRating(rating) {
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

    function setActiveStars(count = ratingValue.innerHTML) {
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
