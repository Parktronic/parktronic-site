import {backendUrl, ROUTES_API} from '../config.js';

const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const DELETE_METHOD = 'DELETE';
const PUT_METHOD = 'PUT';

export class API {
  /**
   * Проверяет, является ли пользователь авторизованным.
   *
   * @async
   * @function
   // eslint-disable-next-line max-len
   * @return {Promise<{isAuthorized: boolean,
   * authorizedUser: ({password: *, name: *, email: *, username: *} | null)}>} Объект* с информацией
   * о статусе авторизации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async isAuth() {
    try {
      const url = backendUrl + ROUTES_API.is_auth.url;

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });

      const body = await res.json();
      let isAuthorized = false;
      let authorizedUser;

      if (res.ok) {
        isAuthorized = true;
        authorizedUser = body.currentUser;
      }

      return {isAuthorized, authorizedUser};
    } catch (e) {
      console.log('Ошибка метода isAuth:', e);
      throw (e);
    }
  }

  /**
   * Функция для авторизации пользователя.
   *
   * @async
   * @function
   * @param {string} email - Почта.
   * @param {string} password - Пароль.
   * @return {Promise<{message: string,
   * authorizedUser: ({password: *, name: *, email: *, username: *} | null)}>} Объект с информацией
   * о статусе авторизации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userLogin(email, password) {
    try {
      const url = backendUrl + ROUTES_API.login.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
      });

      const authorizedUser = await res.json();

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 409) {
        message = 'Невозможно выполнить вход. Завершите предыдущую сессию.';
      }
      if (res.status === 401) {
        message = 'Неправильный логин или пароль.';
      }
      if (res.ok) {
        message = 'ok';
      }

      return {message, authorizedUser};
    } catch (e) {
      console.log('Ошибка метода userLogin:', e);
      throw (e);
    }
  }

  /**
   * Функция для выхода из аккаунта пользователя.
   *
   * @async
   * @function
   * @return {Promise<{message: string}>} - статус выхода из аккаунта.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async userLogout() {
    try {
      const url = backendUrl + ROUTES_API.logout.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        credentials: 'include',
      });

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 401) {
        message = 'Вы не авторизованы, обновите страницу.';
      }
      if (res.status === 408) {
        message = 'Потеряно соединение с сервером.';
      }
      if (res.ok) {
        message = 'ok';
      }

      return {message};
    } catch (e) {
      console.log('Ошибка метода userLogout:', e);
      throw (e);
    }
  }

  /**
   * Функция для регистрации пользователя.
   *
   * @async
   * @function
   * @param {string} first_name - Имя.
   * @param {string} username - Имя пользователя.
   * @param {string} email - Почта.
   * @param {string} password - Пароль.
   * @return {Promise<{registeredUser: ({password: *, name: *, email: *, username: *} | null),
   * message: string}>} Объект с информацией о статусе регистрации и о пользователе.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  // eslint-disable-next-line camelcase
  async userSignup(first_name, username, email, password) {
    try {
      const url =  backendUrl + ROUTES_API.signup.url;

      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          first_name, username, email, password,
        }),
      });

      const registeredUser = await res.json();
      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 422) {
        message = 'Пользователь уже существует.';
      }
      if (res.status === 409) {
        message = 'Невозможно зарегистрироваться. Завершите предыдущую сессию.';
      }
      if (res.ok) {
        message = 'ok';
      }

      return {message, registeredUser};
    } catch (e) {
      console.log('Ошибка метода userSignup:', e);
      throw (e);
    }
  }


  /**
   * Функция для получения данных парковок.
   *
   * @async
   * @function
   * @return {Promise<{parkings: *, message: string}>} Объект с массивом парковок.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async parkingLots() {
    try {
      let url =  backendUrl + ROUTES_API.parking_lots.url;

      const res = await fetch(url, {
        method: GET_METHOD,
        credentials: 'include',
      });

      const body = await res.json();

      let message = 'Ошибка сервера. Попробуйте позже.';
      let parkings = body["parkings"];

      if (res.ok) {
        message = 'ok'
        parkings = body["parkings"];
      }

      return {message, parkings};
    } catch (e) {
      console.log('Ошибка метода parkingLots:', e);
      throw (e);
    }
  }

  /**
   * Функция для добавления парковки в избранное для пользователя.
   *
   * @async
   * @function
   * @param {Object} parking_lot_id - Данные о парковке.
   * @return {Promise<{parkings: *, message: string}>} Объект с массивом парковок.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async postFavorite(parking_lot_id) {
    try {
      const url = backendUrl + ROUTES_API.post_favorite.url;
      const res = await fetch(url, {
        method: POST_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          parking_lot_id
        }),
      });

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 401) {
        message = 'Вы не авторизованы.';
      }

      if (res.status === 404) {
        message = 'Такой парковки не существует.';
      }

      if (res.status === 422) {
        message ='Парковка уже добавлена.';
      }

      const body = await res.json();

      let currentUser = null;

      if (res.ok) {
        message = 'ok';
        currentUser = body;
      }

      return {message, currentUser};

    } catch (e) {
      console.log('Ошибка метода postFavorite:', e);
      throw (e);
    }
  }

  /**
   * Функция для удаления парковки из избранного для пользователя.
   *
   * @async
   * @function
   * @param {Object} parking_lot_id - Данные о парковке.
   * @return {Promise<{parkings: *, message: string}>} Объект с массивом парковок.
   * @throws {Error} Если произошла ошибка при запросе или обработке данных.
   */
  async deleteFavorite(parking_lot_id) {
    try {
      const url = backendUrl + ROUTES_API.delete_favorite.url;
      const res = await fetch(url, {
        method: DELETE_METHOD,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          parking_lot_id
        }),
      });

      let message = 'Ошибка сервера. Попробуйте позже.';

      if (res.status === 401) {
        message = 'Вы не авторизованы.';
      }

      if (res.status === 404) {
        message = 'Такой парковки не существует.';
      }

      if (res.status === 422) {
        message ='Такой парковки нет в избранном.';
      }

      const body = await res.json();

      let currentUser = null;

      if (res.ok) {
        message = 'ok';
        currentUser = body["currentUser"];
      }

      return {message, currentUser};

    } catch (e) {
      console.log('Ошибка метода postFavorite:', e);
      throw (e);
    }
  }
}
