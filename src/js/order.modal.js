import throttle from 'lodash.throttle';

const refs = {
  btnOpen: document.querySelector('[data-order-btn-open]'),
  btnClose: document.querySelector('[data-order-btn-close]'),
  backdrop: document.querySelector('[data-order-backdrop]'),
  scrollOnModal: document.querySelector('body'),
  btnSend: document.querySelector('.order-form-btn'),
};

refs.btnOpen.addEventListener('click', onBtnOpenClick);
refs.btnClose.addEventListener('click', onBtnCloseClick);
refs.backdrop.addEventListener('click', onBackdropClick);

refs.btnSend.addEventListener('submit', onBtnSendClick);

function onBtnOpenClick(event) {
  window.addEventListener('keydown', onEscPress);
  refs.scrollOnModal.classList.add('scroll-blocked');
  refs.backdrop.classList.remove('is-hidden');
}

function onBtnCloseClick() {
  window.removeEventListener('keydown', onEscPress);
  refs.scrollOnModal.classList.remove('scroll-blocked');
  refs.backdrop.classList.add('is-hidden');
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onBtnCloseClick();
  }
}

function onEscPress(event) {
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) {
    onBtnCloseClick();
  }
}

function onBtnSendClick(event) {
  event.preventDefault();
  console.log(event);
}
