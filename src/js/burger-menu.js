const mobileMenu = document.querySelector('.mobile-menu');
const mobMenuOpenBtn = document.querySelector('.mob-menu-btn-open');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');

mobMenuOpenBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('is-hidden');
});

mobMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.add('is-hidden');
});



const headerHomeLink = document.querySelector('.header-home');
const headerFavoritesLink = document.querySelector('.header-favorites');

headerHomeLink.addEventListener('click', function() {
    headerHomeLink.classList.add('active');
    headerFavoritesLink.classList.remove('active');
});

headerFavoritesLink.addEventListener('click', function () {
    headerFavoritesLink.classList.add('active');
    headerHomeLink.classList.remove('active');
});