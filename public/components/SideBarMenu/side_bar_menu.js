import {STORAGE} from '../../modules/storage.js';
import {init, myMap, zoom} from "../pages/ParkingLots/parkings_lots.js";
import {countLots} from "../pages/ParkingLots/parkings_lots.js";
import {closePopUpWindow, renderSearch} from "../Search/search.js";
import {API} from "../../modules/api.js";
import {removeMessage, renderMessage} from "../Message/message.js";
import {goToPage} from "../../modules/router.js";
import {ROUTES} from "../../config.js";
import {renderProfileMenu} from "../ProfileMenu/profile_menu.js";

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
 * Функция для ререндеринга сайдбара.
 *
 * @function
 * @return {void}
 */
window.addEventListener('resize',  async () => {
  renderSideBarMenu();
});

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
  let screenWidth = window.innerWidth;
  let isSmallScreen = screenWidth <= 480;
  rootElement.innerHTML = Handlebars.templates.side_bar_menu({user: STORAGE.user, isSmallScreen: isSmallScreen});

  if (isSmallScreen) {
    const openFavoritesPopupButton = document.querySelector('#open-favourite_button');
    openFavoritesPopupButton.addEventListener('click', () => {
      removeMessage();
      closePopUpWindow();
      const messageContainer = document.querySelector('#favorites-popup');
      messageContainer.style.display = 'block';
    })
  }

  const profileButton = document.querySelector('#side-bar_profile__name');
  profileButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    removeMessage();
    renderProfileMenu();
  });

  let allParkingsDiv = document.querySelector('#user-park-container');
  if (!allParkingsDiv) {
    return;
  }
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
        oneParkingDiv.innerHTML = Handlebars.templates.parking_lot_info({
          parking:
            {
              id: userParking.id,
              address: userParking.address,
              free_lots: lotsInfo.freeLotsCounter,
              all_lots: lotsInfo.allLotsCounter,
            },
          isFavorite: true,
          inSearch: false,
        });
        allParkingsDiv.appendChild(oneParkingDiv);

        const showOnMapButton = document.querySelector(`#favorites-show-on-map_button_${userParking.id}`);
        showOnMapButton.addEventListener('click', () => {
          zoom(myMap, userParking.coords);
        });

        const deleteButton = document.querySelector(`#favorites-delete-button_${userParking.id}`);
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

  const cancelButton = document.querySelector('#favorites-popup-cancel-button');
  if (!cancelButton) {
    return;
  }
  cancelButton.addEventListener('click', () => {
    closePopUpWindow();
  });

  let flagClosed = false;
  const closeButton = document.querySelector('#side-bar-menu-close-button');
  if (!closeButton) {
    return;
  }
  closeButton.addEventListener('click', () => {
    const menu = document.querySelector('.side-bar-menu');
    if (flagClosed) {
      menu.classList.add('side-bar-menu__open');
      menu.classList.remove('side-bar-menu__close');
      closeButton.innerHTML = 'menu_open';
      flagClosed = false;
    } else {
      menu.classList.remove('side-bar-menu__open');
      menu.classList.add('side-bar-menu__close');
      closeButton.innerHTML = 'menu';
      flagClosed = true;
    }
  });
};