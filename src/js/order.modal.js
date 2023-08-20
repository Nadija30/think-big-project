import throttle from 'lodash.throttle';

const refs = {
    btnOpen: document.querySelector('[data-order-btn-open]'),
    btnClose: document.querySelector('[data-order-btn-closed]'),
    backdrop: document.querySelector('[data-order-backdrop]'),
    scrollOnModal: document.querySelector('body'),
    form: document.querySelector('.order-form'),
    message: document.querySelector('.order-message'),
};

console.log(refs);

const LOCAL_KEY = 'order-data';

refs.btnOpen.addEventListener('click', onBtnOpenClick);
refs.btnClose.addEventListener('click', onBtnCloseClick);
refs.backdrop.addEventListener('click', onBackdropClick);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

function onBtnOpenClick() {
    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');

    setFormData();
}

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function setFormData() {
    const savedFormData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (savedFormData) {
        refs.form.user_name.value = savedFormData.user_name || '';
        refs.form.user_phone.value = savedFormData.user_phone || '';
        refs.form.user_email.value = savedFormData.user_email || '';
    }
}

function onFormSubmit(event) {
    event.preventDefault();

    if (
        !refs.form.user_name.value ||
        !refs.form.user_phone.value ||
        !refs.form.user_email.value
    )
        return alert('Будь ласка, заповніть усі поля!');

    localStorage.removeItem(LOCAL_KEY);
    event.currentTarget.reset();
    formData = {};

    // refs.message.classList.remove('is-hidden');
    // setTimeout(() => {
    //   refs.message.classList.add('is-hidden');
    // }, 5000);
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
