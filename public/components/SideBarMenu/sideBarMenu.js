import {STORAGE} from '../../modules/storage.js';
import {renderProfileMenu} from "../ProfileMenu/profileMenu.js";
import {myMap, zoom} from "../pages/Parkings/parkings.js";
import {countLots} from "../pages/Parkings/parkings.js";
import {renderSearch} from "../Search/search.js";
import {API} from "../../modules/api.js";
import {renderMessage} from "../Message/message.js";
import {goToPage} from "../../modules/router.js";
import {ROUTES} from "../../config.js";

/**
 * Функция поиска парковки по id в массиве парковок.
 *
 * @function
 * @param parkings - Массив парковок.
 * @param id - ID искомой парковки.
 * @return {parking: Object | null} - Возвращает данные о найденной парковке,
 * либо null.
 */
const findParkingById = (parkings, id) => {
  for (let i = 0; i < parkings.length; i++) {
    if (parkings[i].id === id) {
      return parkings[i];
    }
  }
  return null;
}

/**
 * Функция для рендеринга меню с инструментами автора опроса.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @return {void}
 */
export const renderSideBarMenu = async () => {
  if (!STORAGE.user) {
    return;
  }
  const rootElement = document.querySelector('#root');
  rootElement.innerHTML = Handlebars.templates.sideBarMenu({user: STORAGE.user});
  const profileButton = document.querySelector('#side-bar_profile__name');
  profileButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    renderProfileMenu();
  });

  let allParkingsDiv = document.querySelector('#user-park-container');
  if (STORAGE.user.parkings) {
    if (STORAGE.user.parkings.length === 0) {
      const h4 = document.createElement('h4');
      h4.style.textAlign = 'center';
      h4.textContent = 'Чтобы добавить парковку в избранное, введите её адрес в поисковой строке!';
      allParkingsDiv.appendChild(h4);
    } else {
      for (let index =  0; index < STORAGE.user.parkings.length; ++index) {
        const userParking = findParkingById(STORAGE.parkings, STORAGE.user.parkings[index]);
        let lotsInfo = countLots(userParking.parking_rows);
        const oneParkingDiv = document.createElement('div');
        oneParkingDiv.innerHTML = Handlebars.templates.parking_info({
          parking:
            {
              id: userParking.id,
              address: userParking.address,
              free_lots: lotsInfo.freeLotsCounter,
              all_lots: lotsInfo.allLotsCounter,
            },
          favourite: true
        });
        allParkingsDiv.appendChild(oneParkingDiv);

        const showOnMapButton = document.querySelector(`#show-on-map_button_${userParking.id}`);
        showOnMapButton.addEventListener('click', () => {
          zoom(myMap, userParking.coords);
        });

        const deleteButton = document.querySelector(`#delete-button_${userParking.id}`);
        deleteButton.addEventListener('click', async () => {
          try {
            const api = new API();
            const res = await api.deleteFavorite(userParking.id);

            if (res.message !== 'ok') {
              renderMessage(res.message, true);
              return;
            }

            if (res.currentUser) {
              STORAGE.user = res.currentUser;
            }

            goToPage(ROUTES.parkings);
            renderMessage('Вы успешно удалили парковку из избранного');
          } catch (err) {
            if (err.toString() !== 'TypeError: Failed to fetch') {
              renderMessage('Ошибка сервера. Попробуйте позже', true);
              return;
            }
            renderMessage('Потеряно соединение с сервером', true);
          }
        });
      }
    }
  }

  renderSearch();

  let flagClosed = false;
  const closeButton = document.querySelector('#author-menu-close-button');
  closeButton.addEventListener('click', () => {
    const menu = document.querySelector('.form-author-menu');
    if (flagClosed) {
      menu.classList.add('form-author-menu__open');
      menu.classList.remove('form-author-menu__close');
      closeButton.innerHTML = 'menu_open';
      flagClosed = false;
    } else {
      menu.classList.remove('form-author-menu__open');
      menu.classList.add('form-author-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    }
  });
};