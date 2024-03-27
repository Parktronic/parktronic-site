import { frontendUrl, ROUTES } from '../../config.js';
import { goToPage } from '../../modules/router.js';
import { STORAGE } from '../../modules/storage.js';
import { API } from "../../modules/api.js";
import { renderMessage } from "../Message/message.js";
import { renderProfileMenu } from "../ProfileMenu/profileMenu.js";
import { myMap, zoom } from "../pages/Parkings/parkings.js";
import { countLots } from "../pages/Parkings/parkings.js";

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
    rootElement.innerHTML = Handlebars.templates.sideBarMenu({ user: STORAGE.user });

    const profileButton = document.querySelector('#side-bar_profile__name');
    profileButton.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        renderProfileMenu();
    });

    let allParkingsDiv = document.querySelector('#user-park-container');
    for (let index = 0; index < STORAGE.user.parkings.length; ++index) {
        let lotsInfo = countLots(STORAGE.user.parkings[index].parking_rows);

        const oneParkingDiv = document.createElement('div');
        oneParkingDiv.innerHTML = Handlebars.templates.parking_info({
            parking: {
                address: STORAGE.user.parkings[index].address,
                free_lots: lotsInfo.freeLotsCounter,
                all_lots: lotsInfo.allLotsCounter,
            },
            favourite: true
        });
        allParkingsDiv.appendChild(oneParkingDiv);
        const showOnMapButton = document.querySelector('#show-on-map_button');
        showOnMapButton.addEventListener('click', () => {
            zoom(myMap, STORAGE.user.parkings[index].coords);
        });
    }

    document.getElementById("search-icon-button").addEventListener("click", () => {
        let searchValue = document.getElementById("search-input").value;
        let resultsList = document.getElementById("search_result");
        resultsList.innerHTML = "";

        if (searchValue === '') {
            let p = document.createElement('p');
            p.textContent = "Вы ничего не ввели!";
            resultsList.appendChild(p)
            return;
        }

        let counter = 0;
        for (let i = 0; i < STORAGE.parkings.length; i++) {
            let parking = STORAGE.parkings[i];
            if (parking.address.toLowerCase().includes(searchValue.toLowerCase())) {
                counter++;
                let userParkingButton = document.createElement('button');
                let userParkingDiv = document.createElement('div');
                userParkingButton.textContent = parking.address;
                userParkingButton.classList.add("primary-button");
                resultsList.appendChild(userParkingButton);
                resultsList.appendChild(userParkingDiv);

                userParkingButton.addEventListener('click', () => {
                    if (userParkingButton.classList.contains('open')) {
                        userParkingDiv.innerHTML = '';
                        userParkingButton.classList.remove('open');
                        userParkingButton.classList.add('close');
                        addButton.classList.add('display-none');
                        return;
                    }
                    userParkingButton.classList.remove('close');
                    userParkingButton.classList.add('open');
                    userParkingDiv.innerHTML = '';

                    let freeLots = 0;
                    let allLots = 0;
                    for (let parkingRowIndex = 0; parkingRowIndex < parking.parking_rows.length; parkingRowIndex++) {
                        freeLots += parking.parking_rows[parkingRowIndex].free_spaces.length;
                        allLots += parking.parking_rows[parkingRowIndex].number;
                    }
                    userParkingDiv.innerHTML = Handlebars.templates.parking_info({
                        parking: {
                            free_lots: freeLots,
                            all_lots: allLots,
                        }
                    });
                    let addButton = userParkingDiv.querySelector("#parking-info_button");

                    if (addButton) {
                        addButton.addEventListener('click', async() => {
                            try {
                                const api = new API();
                                const res = await api.addParking(i);

                                if (res.message !== 'ok') {
                                    renderMessage(res.message, true);
                                    return;
                                }

                                STORAGE.user = res.currentUser;

                                goToPage(ROUTES.parkings);
                                renderMessage('Вы успешно добавили парковку в избранное');
                            } catch (err) {
                                if (err.toString() !== 'TypeError: Failed to fetch') {
                                    renderMessage('Ошибка сервера. Попробуйте позже', true);
                                    return;
                                }
                                renderMessage('Потеряно соединение с сервером', true);
                            }
                        });
                    }
                });

            }
        }

        if (counter === 0) {
            let resultsList = document.getElementById("search_result");
            resultsList.innerHTML = "";
            let p = document.createElement('p');
            p.textContent = "Ничего не найдено";
            resultsList.appendChild(p)
        }
    });

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