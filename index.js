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

    myMap.controls.remove('searchControl');     // удаляем поиск
    myMap.controls.remove('trafficControl');    // удаляем контроль трафика
    myMap.controls.remove('typeSelector');      // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим

    if (STORAGE.parkings) {
        for (let index = 0; index < STORAGE.parkings.length; ++index) {
            myMap.geoObjects.add(new ymaps.Placemark(STORAGE.parkings[index].coords, {
                hintContent: STORAGE.parkings[index].address,
                balloonContent: `${STORAGE.parkings[index].address}<br>
                Количество свободных мест: ${STORAGE.parkings[index].free_lots.right_side.length
                + STORAGE.parkings[index].free_lots.left_side.length}/${STORAGE.parkings[index].all_lots.left_side.number
                + STORAGE.parkings[index].all_lots.right_side.number}`
            }, {
                preset: 'islands#icon',
                iconColor: '#02006B'
            }))
        }
    }
};

const renderParkings = async() => {
    const rootElement = document.querySelector('#root');

    console.log('renderParkings')

    ymaps.ready(init);
};

const renderInfo = async () => {
    const parkingsListElement = document.querySelector('#parkings-list');

    // Добавляем заголовок для списка парковок
    const heading = document.createElement('h2');
    heading.textContent = 'Список парковок';
    parkingsListElement.appendChild(heading);

    console.log('Parking Info');
    console.log(STORAGE.parkings);

    // Добавляем информацию о каждой парковке
    STORAGE.parkings.forEach(parking => {
        const parkingInfo = document.createElement('p');
        parkingInfo.textContent = `Адрес: ${parking.address}, Количество свободных мест: ${parking.free_lots.right_side.length + parking.free_lots.left_side.length}/${parking.all_lots.left_side.number + parking.all_lots.right_side.number}`;
        parkingsListElement.appendChild(parkingInfo);
    });
}

renderParkings();