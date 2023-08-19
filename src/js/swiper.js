import { getEvents } from './search-api';
const swiperWrapperElement = document.querySelector('.swiper-wrapper');

getEvents()
    .then(data => {
        createMarkupSwiper(data);
    })
    .catch(error => console.log(error));

function createMarkupSwiper(arrSliders) {
    swiperWrapperElement.insertAdjacentHTML(
        'beforeend',
        arrSliders
        .map(({ cook, topic }) =>
            `<div class="swiper-slide">
                <div class="slider-images">
                    <div class="image-container-1"><img class="image-1" src=${cook.imgUrl} alt=${cook.name}></div>
                    <div class="image-container-2">
                        <img class="image-2" data-swiper-parallax-scale="0.2" src=${topic.previewUrl} alt=${cook.name}>
                        <h2 class="image-title" data-swiper-parallax="10" data-swiper-parallax-duration="600">${topic.name}</h2>
                        <p class="image-descraption" data-swiper-parallax="30" data-swiper-parallax-duration="500">${topic.area}</p>
                    </div>
                    <div class="image-container-3"><img class="image-3" data-swiper-parallax="-15" data-swiper-parallax-scale="1.1" src=${topic.imgUrl} alt=${cook.name}></div>
                </div>   
            </div>`)
        .join('')
    );
}

// SWIPER
const swiper = new Swiper('.swiper', {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,

    parallax: true,
    speed: 2000,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
        keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    spaceBetween: 16,
});