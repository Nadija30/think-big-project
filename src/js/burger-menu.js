const mobMenuOpenBtn = document.querySelector('.menu-open-btn');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');
const mobileMenu = document.querySelector('.mobile-menu');

mobMenuOpenBtn.addEventListener('click', function() {
  mobileMenu.classList.add('open');
});

mobMenuCloseBtn.addEventListener('click', function() {
  mobileMenu.classList.remove('open');
});