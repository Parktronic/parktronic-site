const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const DELETE_METHOD = 'DELETE';
const PUT_METHOD = 'PUT';

const ROUTES_API = {
    get_parkings: {
        url: 'http://localhost:8000/get_parkings',
        method: GET_METHOD,
    },
    post_parkings: {
        url: 'http://localhost:8000/add_parkings',
        method: POST_METHOD,
    },
};

let STORAGE = {
    user: null,
    parkings: [],
};

class API {
    async getParkings() {
        try {
            let url = ROUTES_API.get_parkings.url;

            const res = await fetch(url, {
                method: GET_METHOD,
                credentials: 'include',
            });

            const body = await res.json();

            if (res.ok) {
                const parkings = body.parkings;
                console.log('Все ок');
                return { message: 'ok', parkings };
            }

            return { message: 'Ошибка сервера. Попробуйте позже', forms: null };
        } catch (e) {
            console.log('Ошибка метода getParkings:', e);
            throw (e);
        }
    }
}

const init = async() => {
    try {
        const api = new API();
        const isParkings = await api.getParkings();
        if (isParkings) {
            STORAGE.parkings = isParkings.parkings;
            console.log(STORAGE.parkings)

            renderInfo();
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

    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
};

const renderParkings = async() => {
    const rootElement = document.querySelector('#root');

    console.log('renderParkings')

    ymaps.ready(init);
};

renderParkings();