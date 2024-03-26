import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {toggleFunc} from "../Signup/signup.js";
import {navbar} from "../../Navbar/navbar.js";
import {debounce} from "../Parkings/parkings.js";

/**
 * Функция для рендеринга страницы аутенфикации.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderLogin = async () => {
  removeMessage();

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<div class="auth-container"> \
                            <form class="auth-container__form"> \
                                <div class="login-form"> \
                                    <div class="login-form_container"> \
                                        <h3>Вход</h3><br> \
                                        <div class="login-form_container__input-container"> \
                                            <input class="login-form_container__input" type="email" placeholder="Почта" id="email" name="email" required><br> \
                                        </div> \
                                        <div class="login-form_container__input-container"> \
                                            <input class="login-form_container__input" type="password" placeholder="Пароль" id="password" name="password" required> \
                                            <i id="login-form_container__input-show-button" class="login-form_container__input-show-button" > \
                                                <span id="login-form_container__input-show-button-icon" class="material-symbols-outlined">visibility</span> \
                                            </i> \
                                        </div> \
                                        <div class="button-container"> \
                                            <button class="secondary-button" type="submit" id="login-button">Войти</button> \
                                            <button class="primary-button" type="submit" id="signup-button">Регистрация</button> \
                                        </div> \
                                    </div> \
                                </div> \
                            </form> \
                        </div>';

  const loginButton = document.querySelector('#login-button');
  const signupButton = document.querySelector('#signup-button');
  const showPasswordButton = document.querySelector('#login-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#password');
    const icon = document.querySelector('#login-form_container__input-show-button-icon');

    toggleFunc(password, icon);
  });

  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  email.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500));

  password.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500));

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const api = new API();
      const res = await api.userLogin(email.value, password.value);
      if (res.message !== 'ok') {
        renderMessage(res.message, true);
        return;
      }
      STORAGE.user = await res.authorizedUser;
      navbar();
      goToPage(ROUTES.parkings);
      renderMessage('Вы успешно вошли');
    } catch (err) {
      if (err.toString() !== 'TypeError: Failed to fetch') {
        renderMessage('Ошибка сервера. Попробуйте позже', true);
        return;
      }
      renderMessage('Потеряно соединение с сервером', true);
    }
  });

  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
};
