import {ROUTES} from '../../config.js';
import {removeMessage} from '../Message/message.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';

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
  navbarElement.innerHTML = '<button class="secondary-button" id="navbar-login-button">Войти</button><button class="secondary-button" id="navbar-signup-button">Регистрация</button>';

  const user = STORAGE.user;
  if (!user) {
    const loginButton = document.querySelector('#navbar-login-button');
    loginButton.addEventListener('click', () => {
      goToPage(ROUTES.login);
    });

    const signupButton = document.querySelector('#navbar-signup-button');
    signupButton.addEventListener('click', () => {
      goToPage(ROUTES.signup);
    });
  }
};
