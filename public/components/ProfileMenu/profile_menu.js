import { ROUTES } from '../../config.js';
import { goToPage } from '../../modules/router.js';
import { STORAGE } from '../../modules/storage.js';

/**
 * Функция для рендеринга страницы с созданными пользователем опросами.
 * Если пользователь не авторизован, ничего не происходит.
 *
 * @function
 * @return {void}
 */
export const renderProfileMenu = () => {
    if (!STORAGE.user) {
        return;
    }

    const popup = document.querySelector('#popup');
    popup.innerHTML = Handlebars.templates.profile_menu();

    // Функция убирающая рендер меню, а так же убирающая event listener клика по области вне нее
    const removeProfileMenu = (e) => {
        if (!e.target.classList.contains('navbar-profile-menu') &&
            !e.target.parentNode.classList.contains('navbar-profile-menu')) {
            document.body.removeEventListener('click', removeProfileMenu);
            popup.innerHTML = '';
        }
    };
    document.body.addEventListener('click', removeProfileMenu);

    const logoutButton = document.querySelector('#navbar-menu-logout-button');
    logoutButton.addEventListener('click', () => {
        popup.innerHTML = '';
        goToPage(ROUTES.logout);
    });
};
