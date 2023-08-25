const mobileMenu = document.querySelector('.mobile-menu');
const mobMenuOpenBtn = document.querySelector('.mob-menu-btn-open');
const mobMenuCloseBtn = document.querySelector('.mob-menu-btn-close');

mobMenuOpenBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('is-hidden');
});

mobMenuCloseBtn.addEventListener('click', function() {
    mobileMenu.classList.add('is-hidden');
});

// "active"

document.addEventListener("DOMContentLoaded", function() {
        const headerLinkHome = document.getElementById("home-link");
        const headerLinkFavorites = document.getElementById("favorites-link");

        function setActiveLink(link) {
            headerLinkHome.classList.remove("active");
            headerLinkFavorites.classList.remove("active");
            link.classList.add("active");
        }

        headerLinkHome.addEventListener("click", function(event) {
            setActiveLink( headerLinkHome);
        });

        headerLinkFavorites.addEventListener("click", function(event) {
            setActiveLink(headerLinkFavorites);
        });

        if (window.location.pathname.includes("Favorites.html")) {
            setActiveLink(headerLinkFavorites);
        } else {
            setActiveLink(headerLinkHome);
        }
});

// "mobile active"
document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const mobMenuItems = document.querySelectorAll('.header-list-item')
 
    mobMenuItems.forEach(item => {
      item.classList.remove('active-header-list-item');
    });
     mobMenuItems.forEach(item => {
      if (item.getAttribute('href') === currentPath) {
        item.classList.add('active-header-list-item');
      }
    });
});