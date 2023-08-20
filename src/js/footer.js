//* =============================================== BTN-UP */

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

//* =============================================== FEEDBACK MODAL */

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-feedback-modal-open]'),
    closeModalBtn: document.querySelector('[data-feedback-modal-close]'),
    modal: document.querySelector('[data-feedback-modal]'),
  };
  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.modal.addEventListener('click', (click) => {
    if (click.target === click.currentTarget) toggleModal();
  });
    
  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }
})();