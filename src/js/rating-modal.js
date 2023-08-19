const refs = {
    modal: document.querySelector(`.backdrop__rating`),
    closeBtn: document.querySelector(`.close__btn`),
};

refs.closeBtn.addEventListener(`click`, closeModal);

function closeModal() {
    refs.modal.classList.add(`is-hidden`);
}

initRatings();

function initRatings() {
    const ratings = document.querySelectorAll(`.rating`);
    console.log(ratings);
    let ratingValue, ratingStars;

    ratings.forEach(rating => {
        console.log(rating);
        initRating(rating);
    });

    function initRating(rating) {
        initRatingValues(rating);
        setActiveStars();
        console.log(rating);
        if (rating.classList.contains(`set__rating`)) {
            rating.addEventListener(`change`, setNewValue);
        }
    }

    function initRatingValues(rating) {
        ratingValue = rating.querySelector(`.rating__value`);
        console.log(ratingValue);
        ratingStars = rating.querySelectorAll(`.rating__icon`);
        console.log(ratingStars);
    }

    function setActiveStars(count = ratingValue.innerHTML) {
        console.log(count);
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
