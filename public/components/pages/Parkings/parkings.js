import {API} from '../../../modules/api.js';
import {removeMessage, renderMessage} from '../../Message/message.js';
import {STORAGE} from '../../../modules/storage.js';

const countLots = (parking_rows) => {
  let freeLotsCounter = 0;
  let allLotsCounter = 0;
  for (let i = 0; i < parking_rows.length; i++) {
    freeLotsCounter += parking_rows[i].free_spaces.length;
    allLotsCounter += parking_rows[i].number;
  }
  return {freeLotsCounter, allLotsCounter};
}

const init = async () => {
  try {
    const api = new API();
    const isParkings = await api.getParkings();
    if (isParkings) {
      STORAGE.parkings = isParkings.parkings;
    }
  } catch (e) {
    if (e.toString() === 'TypeError: Failed to fetch') {
      renderMessage('Потеряно соединение с сервером', true);
    }
  }

  let myMap = new ymaps.Map('map', {
    center: [55.70578, 37.61786],
    zoom: 11,
  });

  // let fullscreenControl = new ymaps.control.FullscreenControl();
  // myMap.controls.add(fullscreenControl);
  // fullscreenControl.enterFullscreen();

  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим

  if (STORAGE.parkings) {
    for (let index = 0; index < STORAGE.parkings.length; index++) {
      const lots = countLots(STORAGE.parkings[index].parking_rows);
      myMap.geoObjects.add(new ymaps.Placemark(
        STORAGE.parkings[index].coords,
        {
          hintContent: STORAGE.parkings[index].address,
          balloonContent: `${STORAGE.parkings[index].address}<br>
          Количество свободных мест: ${lots.freeLotsCounter}/${lots.allLotsCounter}`
        },
        {
          preset: 'islands#icon',
          iconColor: '#02006B'
        }
      ))
    }
  }
}

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, происходит редирект на страницу входа.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderParkings = async () => {
  removeMessage();

  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = '';

  renderSideBarMenu();
  rootElement.insertAdjacentHTML('beforeend', Handlebars.templates.parkings());

  ymaps.ready(init);
};

export const debounce = (func, delay) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
