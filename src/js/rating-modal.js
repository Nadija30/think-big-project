import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

const recipeID = `6462a8f74c3d0ddd28897fc1`;

const refs = {
    modal: document.querySelector(`.backdrop__rating`),

    closeRatingModal: document.querySelector(`.close__rating__btn`),
    ratingForm: document.querySelector(`.rating__form`),
};

refs.closeRatingModal.addEventListener(`click`, toggleModal);
refs.ratingForm.addEventListener(`submit`, submitRating);

function toggleModal() {
    refs.modal.classList.toggle(`is-hidden`);
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
        .patch(
            `https://tasty-treats-backend.p.goit.global/api/recipes/6462a8f74c3d0ddd28897fc1/rating`,
            inputValues
        )
        .then(response => {
            Notiflix.Report.success(
                `Great`,
                `Compeltly add rating for ${response.data.title}`,
                `Return`
            );

            toggleModal();
        })
        .catch(error => {
            Notiflix.Notify.failure(`${error.response.data.message}`);
        });
}
