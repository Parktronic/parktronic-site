import {resetBoxShadow} from "../Search/search.js";

/**
 * Функция для рендеринга всплывающего диалогового окна.
 *
 * @function
 * @return {void}
 */
export const renderPopUpWindow = () => {
  const popupContainer = document.querySelector('#popup');
  popupContainer.innerHTML = Handlebars.templates.popup_window();

  disableScroll();

  const searchForm = document.querySelector('#search-form');
  const cancelButton = document.querySelector('#popup-cancel-button');
  cancelButton.addEventListener('click', () => {
    closePopUpWindow();
    if (searchForm.classList.contains('open')) {
      searchForm.classList.remove('open');
      resetBoxShadow(searchForm);
    }
  });
};

/**
 * Функция для закрытия всплывающего окна.
 *
 * @function
 * @return {void}
 */
export const closePopUpWindow = () => {
  enableScroll();
  const messageContainer = document.querySelector('#popup');
  messageContainer.innerHTML = '';
};

function disableScroll() {
  document.body.classList.add("stop-scrolling");
}

function enableScroll() {
  document.body.classList.remove("stop-scrolling");
}
