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
        // Вычисляем общее количество мест и свободных мест для текущей парковки
        let totalFreePlaces = 0;
        let totalPlaces = 0;
        STORAGE.parkings[index].rows.forEach(row => {
            totalFreePlaces += row.free_places.length;
            totalPlaces += row.capacity;
        });

        const balloonContent = `${STORAGE.parkings[index].city}, ${STORAGE.parkings[index].street}<br>
            Количество свободных мест: ${totalFreePlaces}/${totalPlaces}`;

        myMap.geoObjects.add(new ymaps.Placemark(STORAGE.parkings[index].coordinates, {
            hintContent: `${STORAGE.parkings[index].city}, ${STORAGE.parkings[index].street}`,
            balloonContent: balloonContent
        }, {
            preset: 'islands#icon',
            iconColor: '#02006B'
        }));
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

    const parkingsList = document.createElement('ul');

    STORAGE.parkings.forEach(parking => {
        const parkingItem = document.createElement('li');
        parkingItem.classList.add('parking-item');

        const address = document.createElement('p');
        address.textContent = `Адрес: ${parking.city}, ${parking.street}, ${parking.house}`;
        parkingItem.appendChild(address);

        let totalFreePlaces = 0;
        parking.rows.forEach(row => {
            totalFreePlaces += row.free_places.length;
        });

        let totalPlaces = 0;
        parking.rows.forEach(row => {
            totalPlaces += row.capacity;
        });

        const placesInfo = document.createElement('p');
        placesInfo.textContent = `Свободных мест: ${totalFreePlaces}/${totalPlaces}`;
        parkingItem.appendChild(placesInfo);

        parkingsList.appendChild(parkingItem);
    });

    parkingsListElement.appendChild(parkingsList);
}

renderParkings();