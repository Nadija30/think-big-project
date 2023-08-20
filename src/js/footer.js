// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

  // const notifyInit = Notify.init({
  // width: '280px',
  // position: 'right-bottom',
  // distance: '20px',
  // // timeout: 2600,
  // opacity: 0.8,
  // fontSize: '20px',
  // borderRadius: '50px 10px',
  // notiflixIconColor: 'rgba(0,0,0,0.6)',
  // pauseOnHover: true,
  // });
  // Notiflix.Notify.info('Thank you for your feedback!');
  // Notiflix.Notify.info("Please, tell us what you are looking for.", notifyInit);
  
// .catch(error => {
//         Notiflix.Notify.Failure('An error occurred: ' + error.message);
//     });

// const paramsForNotify = {
//             position: 'center-center',
//             timeout: 3000,
//             width: '400px',
//             fontSize: '24px'
//         };

// const paramsForNotify = {
//             position: 'center-center',
//             timeout: 3000,
//             width: '400px',
//             fontSize: '24px',
//             // opacity: 0.8,
//             fontSize: '20px',
//             borderRadius: '15px',
//   //           background: 'rgba(155, 181, 55, 0.6)',
//   // notiflixIconColor: '#f8f8f8',
//                 backOverlayColor: '#9bb537',

//             pauseOnHover: true,
//         };
//   Notify.Success('Thank you for your feedback!', paramsForNotify);

//  Notify.info('Введіть свій запит, будь ласка!', paramsForNotify);
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

  refs.form.addEventListener("input", onFormInput);
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
    Notiflix.Notify.info('Thank you for your feedback!', paramsForNotify);
     }
})();


