import {goToPage} from "../../../modules/router.js";
import {ROUTES} from "../../../config.js";
import {STORAGE} from "../../../modules/storage.js";

/**
 * Функция для рендеринга главной страницы с информацией о сервисе.
 *
 * @function
 * @return {void}
 */
export const renderMain = () => {
  if (STORAGE.user) {
    goToPage(ROUTES.parkings);
    return;
  }
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '<div class="index"> \
                              <h3>Добро пожаловать на Parktronic!</h3> \
                              <div class="index_content-container"> \
                                  <div class="index_content-container_description"> \
                                      Проект "Parktronic" - это умный сервис для поиска свободных парковочных мест.<br> \
                                      Для начала использования войдите в аккаунт или создайте его. \
                                      <div class="button-container"> \
                                          <button class="secondary-button" id="index-forms-button">Опробовать Parktronic</button> \
                                      </div> \
                                      <a>Нет аккаунта?  <span id="index-signup-button">Зарегистрируйтесь бесплатно</span></a> \
                                  </div> \
                              </div> \
                          </div>';

  const formsButton = document.querySelector('#index-forms-button');
  formsButton.addEventListener('click', () => {
    goToPage(ROUTES.login);
  });

  const signupButton = document.querySelector('#index-signup-button');
  signupButton.addEventListener('click', () => {
    goToPage(ROUTES.signup);
  });
};
