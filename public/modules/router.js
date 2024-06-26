import {ROUTES} from '../config.js';
import {renderLogin} from '../components/pages/Login/login.js';
import {renderSignup} from '../components/pages/Signup/signup.js';
import {renderParkingLots} from '../components/pages/ParkingLots/parkings_lots.js';
import {renderMain} from '../components/pages/Main/main.js';
import {renderInitial} from '../components/Initial/initial.js';
import {render404} from '../components/404/404.js';
import {navbar} from '../components/Navbar/navbar.js';
import {removeMessage} from "../components/Message/message.js";

/**
 * Расщепляет url запроса на нормальный url (с :id по умолчанию) и id страницы.
 * Так же убирает слеш в конце, если после него ничего не написано.
 *
 * @function
 * @param url - Путь из запроса.
 * @return {{ id: number | null, normalUrl: string }} - Объект,содержащий
 * ID запроса и нормальный url.
 */
export const parseUrl = (url) => {
  if (url[url.length - 1] === '/' && url.length > 1) {
    url = url.slice(0, url.length - 1);
  }
  const index = url.indexOf('/', 1);
  if (index !== -1) {
    let indexRight = url.indexOf('/', index + 1);
    if (indexRight === -1) {
      indexRight = url.length;
    }
    const id = url.slice(index + 1, indexRight);
    if (!Number.isNaN(Number(id))) {
      const normalUrl = `${url.slice(0, index + 1)}:id${url.slice(indexRight, url.length)}`;
      return {id: Number(id), normalUrl};
    }
    return {id: null, normalUrl: url};
  }
  const id = null;
  const normalUrl = url;
  return {id, normalUrl};
};

/**
 * Рендерит выбранную в аргументах страницу.
 * Добавляет либо заменяет на ее в истории переходов.
 *
 * @param page - Объект, в котором содержится информация о странице из ROUTES.
 * @param id - Объект(опцианальный параметр) для перехода на страницу конкретного опроса.
 * @param redirect - Флаг, означающий, что случился редирект.
 * @return {void}
 */
export const goToPage = (page, id = null, redirect = false) => {
  if (!id) {
    id = '';
  }

  const url = page.url.replace(':id', id.toString());
  window.scroll(0, 0);

  if (window.location.pathname !== url) {
    if (redirect) {
      window.history.replaceState(page.state, '', url);
    } else {
      window.history.pushState(page.state, '', url);
    }
  }
  if (id) {
    page.open(id);
    return;
  }
  page.open();
};

/**
 * Рендерит необходимую страницу при перезагрузке сайта (или первом заходе)
 *
 * @async
 * @function
 * @return {void}
 */
export const initialRouter = async () => {
  const temp = parseUrl(window.location.pathname);
  const url = temp.normalUrl;

  await renderInitial();
  switch (url) {
    case '/':
      goToPage(ROUTES.main);
      break;
    case '/parkings':
      goToPage(ROUTES.parkings);
      break;
    case '/login':
      goToPage(ROUTES.login);
      break;
    case '/signup':
      goToPage(ROUTES.signup);
      break;
    default:
      navbar();
      render404();
  }
};

/**
 * Event listener для перехода по истории браузера.
 * При изменении текущего url в браузере происходит рендер соответствующей страницы.
 *
 * @function
 * @param event - Событие.
 * @return {void}
 */
// eslint-disable-next-line func-names
window.onpopstate = (event) => {
  removeMessage();
  const state = event.state;
  switch (state) {
    case 'main':
      renderMain();
      break;
    case 'parkings':
      renderParkingLots();
      break;
    case 'login':
      renderLogin();
      break;
    case 'signup':
      renderSignup();
      break;
    default:
      render404();
  }
};
