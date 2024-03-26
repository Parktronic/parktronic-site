import {ROUTES} from '../../../config.js';
import {API} from '../../../modules/api.js';
import {renderMessage, removeMessage} from '../../Message/message.js';
import {goToPage} from '../../../modules/router.js';
import {STORAGE} from '../../../modules/storage.js';
import {navbar} from "../../Navbar/navbar.js";
import {debounce} from "../Parkings/parkings.js";

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

export const renderSignup = async () => {
  removeMessage();
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<div class="auth-container"> \
                                <form class="auth-container__form"> \
                                    <div class="signup-form"> \
                                        <div class="signup-form_container"> \
                                            <h3>Регистрация</h3><br> \
                                            <div class="signup-form_container__input-container"> \
                                                <input class="signup-form_container__input" placeholder="Имя" id="name" name="name" required><br> \
                                            </div> \
                                            <div class="signup-form_container__input-container"> \
                                                <input class="signup-form_container__input" type="email" placeholder="Почта" id="email" name="email" required><br> \
                                            </div> \
                                            <div class="signup-form_container__input-container"> \
                                                <input class="signup-form_container__input" placeholder="Имя пользователя" id="username" name="username" required><br> \
                                            </div> \
                                            <div class="signup-form_container__input-container"> \
                                                <input class="signup-form_container__input" type="password" placeholder="Пароль" id="password" name="password" required> \
                                                <i id="signup-form_container__input-show-button" class="signup-form_container__input-show-button" > \
                                                    <span id="signup-form_container__input-show-button-icon" class="material-symbols-outlined">visibility</span> \
                                                </i> \
                                            </div> \
                                            <div class="signup-form_container__input-container"> \
                                                <input class="signup-form_container__input" type="password" placeholder="Повторите пароль" id="repeat_password" name="repeat_password" required> \
                                                <i id="signup-form_container__input-show-rep-button" class="signup-form_container__input-show-button" > \
                                                    <span id="signup-form_container__input-show-rep-button-icon" class="material-symbols-outlined">visibility</span> \
                                                </i> \
                                            </div> \
                                            <div class="button-container"> \
                                                <button class="secondary-button"  id="signup-button">Создать аккаунт</button> \
                                            </div> \
                                        </div> \
                                    </div> \
                                </form> \
                            </div>';

  const showPasswordButton = document.querySelector('#signup-form_container__input-show-button');
  showPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#password');
    const icon = document.querySelector('#signup-form_container__input-show-button-icon');

    toggleFunc(password, icon);
  });

  const showRepPasswordButton = document.querySelector('#signup-form_container__input-show-rep-button');
  showRepPasswordButton.addEventListener('click',  () => {
    const password = document.querySelector('#repeat_password');
    const icon = document.querySelector('#signup-form_container__input-show-rep-button-icon');

    toggleFunc(password, icon);
  });

  const firstName = document.querySelector('#name');
  const email = document.querySelector('#email');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const repeatPassword = document.querySelector('#repeat_password');

  firstName.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500));

  email.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500));

  username.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500) );

  password.addEventListener("input", debounce((e) => {
    e.preventDefault();

    removeMessage();
  }, 500));

  const signupButton = document.querySelector('#signup-button');
  signupButton.addEventListener('click', async (e) => {
    e.preventDefault();

    if (password.value === '' || email.value === '' || firstName.value === ''
        || username.value === '' || repeatPassword.value === '') {
      renderMessage('Вы ввели не все данные', true);
      return;
    }

    if (password.value !== repeatPassword.value) {
      renderMessage('Пароли не совпадают', true);
      return;
    }

    try {
      const api = new API();
      const res = await api.userSignup(
        firstName.value,
        username.value,
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