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
        const mobileHeaderLinkHome = document.querySelector(".item-home");
        const mobileHeaderLinkFavorites = document.querySelector(".item-favorites");

        function setActiveLink(link) {
            headerLinkHome.classList.remove("active");
            headerLinkFavorites.classList.remove("active");
            link.classList.add("active");
        }
        
        function setActiveMobileLink(link) {
            mobileHeaderLinkHome.classList.remove("m-active");
            mobileHeaderLinkFavorites.classList.remove("m-active");
            link.classList.add("m-active");
        }

        headerLinkHome.addEventListener("click", function(event) {
            setActiveLink( headerLinkHome);
        });

        headerLinkFavorites.addEventListener("click", function(event) {
            setActiveLink(headerLinkFavorites);
        });
    
        mobileHeaderLinkHome.addEventListener("click", function(event) {
            setActiveMobileLink(mobileHeaderLinkHome);
        });

        mobileHeaderLinkFavorites.addEventListener("click", function(event) {
            setActiveMobileLink(mobileHeaderLinkFavorites);
        });

        if (window.location.pathname.includes("Favorites.html")) {
            setActiveLink(headerLinkFavorites);
            setActiveMobileLink(mobileHeaderLinkFavorites);
        } else {
            setActiveLink(headerLinkHome);
            setActiveMobileLink(mobileHeaderLinkHome);
        }
});