const btnUp = document.querySelector(".btn-up");

window.addEventListener("scroll", onScroll);
btnUp.addEventListener("click", scrollToTop);

function onScroll() { 
  btnUp.classList.toggle('hidden', window.scrollY > 800);
}
function scrollToTop() { 
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
