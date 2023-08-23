const mobileMenu = document.querySelector('.mobile-menu');
const mobMenuOpenBtn = document.querySelector('.mob-menu-btn-open');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');

mobMenuOpenBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('is-hidden');
});

mobMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.add('is-hidden');
});