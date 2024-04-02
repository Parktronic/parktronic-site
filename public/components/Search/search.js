import {STORAGE} from "../../modules/storage.js";
import {countLots, myMap, zoom} from "../pages/Parkings/parkings.js";
import {goToPage} from "../../modules/router.js";
import {renderMessage} from "../Message/message.js";
import {API} from "../../modules/api.js";
import {ROUTES} from "../../config.js";

/**
 * Функция для рендеринга поиска.
 *
 * @function
 * @return {void}
 */
export const renderSearch = () => {
	const searchContainer = document.querySelector('#search-form__container');
	searchContainer.innerHTML = Handlebars.templates.search();

	let searchForm = document.querySelector('#search-form');
	searchForm.addEventListener('click', () => {
		renderSearchPopUpWindow();

		document.querySelector('#search-input').focus();

		if (!searchForm.classList.contains('open')) {
			searchForm.classList.add('open');
			changeBoxShadow(searchForm);
		}
	});

	const searchButton = document.querySelector('#search-form-icon');
	searchButton.addEventListener('click', () => {
		if (searchForm.classList.contains('open')) {
			search();
		}
	})

	const searchInput = document.querySelector('#search-input');
	searchInput.addEventListener("keypress", (e) => {
		if (e.keyCode === 13) {
			search();
		}
	});

	searchInput.addEventListener("keydown", (e) => {
		if (e.keyCode === 27) {
			closePopUpWindow();
		}
	});
};


/**
 * Функция для поиска.
 *
 * @function
 * @return {void}
 */

const search = () => {
	const resultsDiv = document.querySelector("#parkings-container");
	let searchValue = document.querySelector("#search-input").value;
	resultsDiv.innerHTML = "";

  if (searchValue === '') {
    return;
  }

  let counter = 0;
  for (let i = 0; i < STORAGE.parkings.length; ++i) {
    let parking = STORAGE.parkings[i];
    if (parking.address.toLowerCase().includes(searchValue.toLowerCase())) {
	    if (counter === 3) {
		    return;
	    }

      counter++;
	    let userParkingDiv = document.createElement('div');
	    let lotsInfo = countLots(parking.parking_rows);
	    userParkingDiv.innerHTML = Handlebars.templates.search_info({
        parking:
          {
						id: parking.id,
						address: parking.address,
            free_lots: lotsInfo.freeLotsCounter,
            all_lots: lotsInfo.allLotsCounter,
          }
        });
	    resultsDiv.appendChild(userParkingDiv);

	    const showOnMapButton = document.querySelector(`#search_show-on-map_button_${parking.id}`);
			showOnMapButton.addEventListener('click', () => {
				zoom(myMap, parking.coords);
			});

	    const addButton = document.querySelector(`#search_add-parking_button_${parking.id}`);
	    addButton.addEventListener('click', async () => {
		    try {
			    const api = new API();
			    const res = await api.addParking(parking.id);

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
  }

  if (counter === 0) {
    let resultTitle = document.querySelector("#popup-title");
	  resultTitle.textContent = "Такой парковки нет в нашем сервисе";
  }
};

function changeBoxShadow(element) {
	element.style.boxShadow = "-1px 1px 15px 5px rgba(34, 60, 80, 0.4)";
}

export function resetBoxShadow(element) {
	element.style.boxShadow = "-1px 1px 15px 5px rgba(34, 60, 80, 0.2)";
}


/**
 * Функция для рендеринга всплывающего окна поиска.
 *
 * @function
 * @return {void}
 */
export const renderSearchPopUpWindow =  () => {
	disableScroll();

	let resultTitle = document.querySelector("#popup-title");
	resultTitle.textContent = "Здесь будут найденные парковки";

	const messageContainer = document.querySelector('#search-popup');
	messageContainer.style.display = 'block';

	const cancelButton = document.querySelector('#popup-cancel-button');
	cancelButton.addEventListener('click', () => {
		closePopUpWindow();
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

	const searchParkingsContainer = document.querySelector('#parkings-container');
	searchParkingsContainer.innerHTML = '';

	const messageContainer = document.querySelector('#search-popup');
	messageContainer.style.display = 'none';

	const searchForm = document.querySelector('#search-form');
	if (searchForm.classList.contains('open')) {
		searchForm.classList.remove('open');
		resetBoxShadow(searchForm);
	}
};

function disableScroll() {
	document.body.classList.add("stop-scrolling");
}

function enableScroll() {
	document.body.classList.remove("stop-scrolling");
}
