import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

const paramsForNotify = {
            position: 'center-center',
            timeout: 3000,
            width: '400px',
            fontSize: '24px',
            opacity: 0.8,
            fontSize: '20px',
            borderRadius: '15px',
            background: '#9bb537',
            pauseOnHover: true,
        };
//  Notify.success('Thank you for your feedback!', paramsForNotify);
// .catch(error => {
//         Notiflix.Notify.Failure('An error occurred: ' + error.message);
//     });
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
  btnUp.blur();
}

//* =============================================== FEEDBACK MODAL */

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-feedback-modal-open]'),
    closeModalBtn: document.querySelector('[data-feedback-modal-close]'),
    modal: document.querySelector('[data-feedback-modal]'),
    form: document.querySelector(".feedback-form"),
  };

  const LOCAL_KEY = "feedback-data";

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.modal.addEventListener('click', (click) => {
    if (click.target === click.currentTarget) toggleModal();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      if (!refs.modal.classList.contains('is-hidden')) {
        toggleModal();
        refs.openModalBtn.blur();
      }
    }
  });

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');
  }

  refs.form.addEventListener("input", throttle(onFormInput, 500));
  refs.form.addEventListener("submit", onFormSubmit);

  let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

  setFormData();

  function onFormInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
  }

  function setFormData() {
    const savedFormData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (savedFormData) {
      refs.form.user_name.value = savedFormData.user_name || "";
      refs.form.user_message.value = savedFormData.user_message || "";
    }
  }
  
  function onFormSubmit(evt) {
    evt.preventDefault();
    localStorage.removeItem(LOCAL_KEY);
    evt.currentTarget.reset();
    toggleModal();
    formData = {};
  Notiflix.Notify.success('Thank you for your feedback!', paramsForNotify);
     }
})();


