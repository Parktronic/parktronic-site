import  {frontendUrl, ROUTES} from '../../config.js';
import {goToPage} from '../../modules/router.js';
import {STORAGE} from '../../modules/storage.js';
import {API} from "../../modules/api.js";
import {renderMessage} from "../Message/message.js";
import {renderProfileMenu} from "../ProfileMenu/profileMenu.js";
import {myMap, zoom} from "../pages/Parkings/parkings.js";
import {countLots} from "../pages/Parkings/parkings.js";
import {renderSearch} from "../Search/search.js";

/**
 * Функция для рендеринга меню с инструментами автора опроса.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @return {void}
 */
export const renderSideBarMenu = () => {
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
  for (let index =  0; index < STORAGE.user.parkings.length; ++index) {
    let lotsInfo = countLots(STORAGE.user.parkings[index].parking_rows);
    const oneParkingDiv = document.createElement('div');
    oneParkingDiv.innerHTML = Handlebars.templates.parking_info({
      parking:
        {
          id: index,
          address: STORAGE.user.parkings[index].address,
          free_lots: lotsInfo.freeLotsCounter,
          all_lots: lotsInfo.allLotsCounter,
        },
      favourite: true
    });
    allParkingsDiv.appendChild(oneParkingDiv);

    const showOnMapButton = document.querySelector(`#show-on-map_button_${index}`);
    showOnMapButton.addEventListener('click', () => {
      zoom(myMap, STORAGE.user.parkings[index].coords);
    });
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