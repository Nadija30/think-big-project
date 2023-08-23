const mobileMenu = document.querySelector('.mobile-menu');
const mobMenuOpenBtn = document.querySelector('.mob-menu-btn-open');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');

mobMenuOpenBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('is-hidden');
});

mobMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.add('is-hidden');
});



const headerLinkHome = document.querySelector('.header-link-home');
const headerLinkFavorites = document.querySelector('.header-link-favorites');

headerLinkHome.addEventListener('click', function() {
    headerLinkHome.classList.add('active');
    headerLinkHome.classList.remove('active');
});

headerLinkFavorites.addEventListener('click', function () {
    headerLinkFavorites.classList.add('active');
    headerLinkFavorites.classList.remove('active');
});