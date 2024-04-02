import {renderPopUpWindow} from "../PopUpWindow/popup_window.js";

/**
 * Функция для рендеринга сообщений для пользователя на странице.
 *
 * @function
 * @param {string} text - Текст сообщения.
 * @param {boolean} error - Флаг, который показывает, является ли сообщение сообщением об ошибке.
 * @return {void}
 */
export const renderMessage = (text, error = false) => {
  const messageContainer = document.querySelector('#message-box');
  messageContainer.innerHTML = '';
  messageContainer.classList.remove('error-container', 'success-container');
  if (error) {
    messageContainer.classList.add('error-container');
  } else {
    messageContainer.classList.add('success-container');
  }

  messageContainer.innerHTML = Handlebars.templates.message({message: text});
  window.scroll(0, 0);

  let closeButton = document.querySelector('#message_close-button');
  closeButton.addEventListener('click', () => {
    removeMessage();
  });

  setTimeout(removeMessage, 10000);
};

/**
 * Функция для очистки поля ошибки на странице.
 *
 * @function
 * @return {void}
 */
export const removeMessage = () => {
  const messageContainer = document.querySelector('#message-box');
  messageContainer.innerHTML = '';
  messageContainer.classList.remove('error-container', 'success-container');
};
