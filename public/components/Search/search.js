import {renderPopUpWindow} from "../PopUpWindow/popup_window.js";
import {STORAGE} from "../../modules/storage.js";
import {countLots} from "../pages/Parkings/parkings.js";

export const renderSearch = () => {
	const searchContainer = document.querySelector('#search-form__container');
	searchContainer.innerHTML = Handlebars.templates.search();

	let searchForm = document.querySelector('#search-form');
	searchForm.addEventListener('click', () => {
		renderPopUpWindow();

		if (!searchForm.classList.contains('open')) {
			searchForm.classList.add('open');
			changeBoxShadow(searchForm);
		}
	});
};

const search = () => {

}

function changeBoxShadow(element) {
	element.style.boxShadow = "-1px 1px 15px 5px rgba(34, 60, 80, 0.4)";
}

export function resetBoxShadow(element) {
	element.style.boxShadow = "-1px 1px 15px 5px rgba(34, 60, 80, 0.2)";
}