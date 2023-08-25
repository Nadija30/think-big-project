import throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const refs = {
    btnOpen: document.querySelector('[data-order-btn-open]'),
    btnBasket: document.querySelector('[data-basket-btn-open]'),
    btnClose: document.querySelector('[data-order-btn-closed]'),
    backdrop: document.querySelector('[data-order-backdrop]'),
    scrollOnModal: document.querySelector('body'),
    form: document.querySelector('.order-form'),
    message: document.querySelector('.order-message'),
};

const LOCAL_KEY = 'order-data';

if (refs.btnOpen) {
    refs.btnOpen.addEventListener('click', onBtnOpenClick);
}
refs.btnBasket.addEventListener('click', onBtnOpenClick);
refs.btnClose.addEventListener('click', onBtnCloseClick);
refs.backdrop.addEventListener('click', onBackdropClick);

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};

// Функція яка відкриває модалку з кнопки Order now
function onBtnOpenClick() {
    window.addEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.add('scroll-blocked');
    refs.backdrop.classList.remove('is-hidden');

    setFormData();
}

// Функція яка записує дані з полів форми в локальне сховище
function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

// Функція яка встановлює збережені дані в поля форми при завантаженні сторінки
function setFormData() {
    const savedFormData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (savedFormData) {
        refs.form.user_name.value = savedFormData.user_name || '';
        refs.form.user_phone.value = savedFormData.user_phone || '';
        refs.form.user_email.value = savedFormData.user_email || '';
    }
}

// Функція яка обробляє події відправки форми
function onFormSubmit(event) {
    event.preventDefault();

    if (
        !refs.form.user_name.value ||
        !refs.form.user_phone.value ||
        !refs.form.user_email.value
    ) {
        return Notiflix.Report.warning(
            `Oops`,
            `Need to enter all fields`,
            `Return`
        );
    } else {
        localStorage.removeItem(LOCAL_KEY);
        event.currentTarget.reset();
        formData = {};
        Notiflix.Report.success(
            `Great`,
            `Your data is saved. Our manager will contact you soon`,
            `Ok`
        );

        refs.scrollOnModal.classList.remove('scroll-blocked');
        refs.backdrop.classList.add('is-hidden');
    }
}

// Функція закриття модалки по кнопці CLose
function onBtnCloseClick() {
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-blocked');
    refs.backdrop.classList.add('is-hidden');
}

// Функція закриття модалки по бекдропу
function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        onBtnCloseClick();
    }
}

// Функція закриття модалки по натисканню на клавішу Escape
function onEscPress(event) {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
        onBtnCloseClick();
    }
}
