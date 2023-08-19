const refs = {
    modal: document.querySelector(`.backdrop`),
    closeBtn: document.querySelector(`.close__btn`),
    ratings: document.querySelectorAll(`.rating`),
};

refs.closeBtn.addEventListener(`click`, closeModal);

function closeModal() {
    refs.modal.classList.add(`is-hidden`);
}

initRatings();

function initRatings() {
    let ratingStars, ratingValue;
    for (let i = 0; i < refs.ratings.lenght; i++) {
        const rating = refs.ratings[index];
        initRating(rating);
    }

    function initRating(rating) {
        initRatingVars(rating);
        console.log(rating);
        setRatingStars();
    }

    function initRatingVars(rating) {
        ratingStars = rating.querySelectorAll(`.rating__icon`);
        ratingValue = rating.querySelector(`.rating__value`);
    }

    function setRatingStars(i = ratingValue.innerHTML) {
        for (i = 0; i < ratingStars.lenght; i++) {
            const star = ratingStars[i];
            if (i < ratingValue) {
                star.style.stroke = 'rgba(238, 161, 12, 1)';
            }
        }
    }

    // function setRating(rating) {
    //     for (let i = 0; i < ratingRadios.lenght; i++) {
    //         const ratingRadio = ratingRadios[i];
    //         ratitngRadio.addEventListener(`mouseenter`, function (e) {
    //             initRatingVars(rating);
    //         });
    //     }
    // }
}
