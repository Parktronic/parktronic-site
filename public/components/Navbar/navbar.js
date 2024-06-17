import { ROUTES } from '../../config.js';
import { removeMessage } from '../Message/message.js';
import { goToPage } from '../../modules/router.js';
import { STORAGE } from '../../modules/storage.js';

/**
 * Функция для рендеринга навбара страницы.
 * Если в функцию был передан объект пользователя, то рендерится навбар с профилем пользователя,
 * иначе - с кнопками "Войти" и "Регистрация".
 *
 * @async
 * @function
 * @return {void}
 */
export const navbar = () => {
    const navbarElement = document.querySelector('#navbar');
    navbarElement.innerHTML = '';

    const user = STORAGE.user;
    if (!user) {
        navbarElement.innerHTML = Handlebars.templates.navbar();
        const loginButton = document.querySelector('#navbar-login-button');
        loginButton.addEventListener('click', () => {
            goToPage(ROUTES.login);
        });

        const signupButton = document.querySelector('#navbar-signup-button');
        signupButton.addEventListener('click', () => {
            goToPage(ROUTES.signup);
        });

        const logoButton = document.querySelector('#navbar-logo-label');
    logoButton.addEventListener('click', handleLogoClick);

    const iconButton = document.querySelector('#navbar-parktronic-icon');
    iconButton.addEventListener('click', handleLogoClick)
  }
};


/**
 * Функция для обработки нажатия на лого навбара.
 *
 * @function
 * @return {void}
 */
function handleLogoClick() {
  removeMessage();
  if (!STORAGE.user) {
    goToPage(ROUTES.main);
  } else {
    goToPage(ROUTES.parking_lots);
  }
};