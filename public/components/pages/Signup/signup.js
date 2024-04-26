import { ROUTES } from '../../../config.js';
import { API } from '../../../modules/api.js';
import { renderMessage, removeMessage } from '../../Message/message.js';
import {
    nameValidation,
    emailValidation,
    passwordValidation,
    usernameValidation,
} from '../../../modules/validation.js';
import { goToPage } from '../../../modules/router.js';
import { STORAGE } from '../../../modules/storage.js';
import { navbar } from "../../Navbar/navbar.js";
import {debounce} from "../../../modules/validation.js";

/**
 * Функция для рендеринга страницы регистрации.
 *
 * @async
 * @function
 * @return {void}
 */

export const toggleFunc = (password, icon) => {

    if (password.type === 'password') {
        password.type = 'text';
        icon.innerText = 'visibility_off';
    } else {
        password.type = 'password';
        icon.innerText = 'visibility';

    }
};

export const renderSignup = async() => {
    removeMessage();

    document.querySelector('#map').innerHTML = '';
    const rootElement = document.querySelector('#root');
    rootElement.innerHTML = '';
    rootElement.innerHTML = Handlebars.templates.signup();

    const showPasswordButton = document.querySelector('#signup-form_container__input-show-button');
    showPasswordButton.addEventListener('click', () => {
        const password = document.querySelector('#password');
        const icon = document.querySelector('#signup-form_container__input-show-button-icon');

        toggleFunc(password, icon);
    });

    const showRepPasswordButton = document.querySelector('#signup-form_container__input-show-rep-button');
    showRepPasswordButton.addEventListener('click', () => {
        const password = document.querySelector('#repeat_password');
        const icon = document.querySelector('#signup-form_container__input-show-rep-button-icon');

        toggleFunc(password, icon);
    });

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector('#repeat_password');

    let isEmailValid = true;
    let isPasswordValid = true;

    email.addEventListener("input", debounce((e) => {
        e.preventDefault();

        const emailValid = emailValidation(e.target.value);

        if (emailValid.valid) {
            removeMessage();
            isEmailValid = true;
        } else {
            renderMessage(emailValid.message, true);
            isEmailValid = false;
        }
    }, 500));

    password.addEventListener("input", debounce((e) => {
        e.preventDefault();

        const passwordValid = passwordValidation(e.target.value);

        if (passwordValid.valid) {
            removeMessage();
            isPasswordValid = true;
        } else {
            renderMessage(passwordValid.message, true);
            isPasswordValid = false;
        }
    }, 500));

    const signupButton = document.querySelector('#signup-button');
    signupButton.addEventListener('click', async(e) => {
        e.preventDefault();

        if (password.value === '' || email.value === '' || repeatPassword.value === '') {
            renderMessage('Вы ввели не все данные', true);
            return;
        }

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        if (password.value !== repeatPassword.value) {
            renderMessage('Пароли не совпадают', true);
            return;
        }

        try {
            const api = new API();
            const res = await api.userSignup(
                email.value,
                password.value,
            );

            if (res.message !== 'ok') {
                renderMessage(res.message, true);
                return;
            }

            STORAGE.user = res.registeredUser;

            navbar();
            goToPage(ROUTES.parkings);
            renderMessage('Вы успешно зарегистрировались');
        } catch (err) {
            if (err.toString() !== 'TypeError: Failed to fetch') {
                renderMessage('Ошибка сервера. Попробуйте позже', true);
                return;
            }
            renderMessage('Потеряно соединение с сервером', true);
        }
    });
};