import { API } from '../../../modules/api.js';
import { removeMessage, renderMessage } from '../../Message/message.js';
import { STORAGE } from '../../../modules/storage.js';
import {renderSideBarMenu} from "../../SideBarMenu/side_bar_menu.js";


/**
 * Функция для подсчета мест на парковке.
 *
 * @function
 * @param {Object} parking_rows - Данные о рядах парковки.
 * @return {{freeLotsCounter: number, allLotsCounter: number}} - Возвращает количество свободных мест
 * и общее количество мест на парковке.
 */
export const countLots = (parking_rows) => {
    let freeLotsCounter = 0;
    let allLotsCounter = 0;
    for (let i = 0; i < parking_rows.length; i++) {
        freeLotsCounter += parking_rows[i].free_spaces.length;
        allLotsCounter += parking_rows[i].number;
    }
    return { freeLotsCounter, allLotsCounter };
};


/**
 * Функция для определения цвета прогресс-бара на основе его заполненности.
 *
 * @function
 * @param progress - Значение прогресс-бара
 * @return {color} - Возвращает цвет и общее количество мест на парковке.
 */
function getProgressBarColor(progress) {
    if (progress <= 30) {
        return '#FE4533'; // Красный цвет
    } else if (progress <= 70) {
        return '#F9A400'; // Желтый цвет
    } else {
        return '#4CAF50'; // Зеленый цвет
    }
}

// Структура Point для работы с геометрией
class Point {
    constructor(y, x) {
        this.x = x || 0;
        this.y = y || 0;
    }
}


/**
 * Функция для отрисовки четырехугольника на карте.
 *
 * @function
 * @param ymaps - Библиотека карты.
 * @param p1 - Координата вершины.
 * @param p2 - Координата вершины.
 * @param p3 - Координата вершины.
 * @param p4 - Координата вершины.
 * @param color - Цвет четырехугольника.
 * @return {rect} - Возвращает нарисованный четырехугольник.
 */
const drawRect = (ymaps, p1, p2, p3, p4, color) => {
    return new ymaps.Polygon([
        [
            [p1.y, p1.x],
            [p2.y, p2.x],
            [p3.y, p3.x],
            [p4.y, p4.x],
            [p1.y, p1.x]
        ]
    ], {}, {
        fillColor: color,
        opacity: 0.47,
        // strokeColor: color,
        // strokeOpacity: 1,
        // strokeWidth: 1,
    });
}


/**
 * Функция для приближения парковки на карте.
 *
 * @function
 * @param map - Объект карты.
 * @param markCoords - Координаты карты.
 * @return {void}
 */
export const zoom = (map, markCoords) => {
    map.setCenter(markCoords, 20);
};

// Переменная, обозначающая объект карты
export let myMap;


/**
 * Функция для рендеринга карты.
 *
 * @async
 * @function
 * @return {void}
 */
export const init = async() => {
    myMap = new ymaps.Map('map', {
        center: [55.70578, 37.61786],
        zoom: 11,
    }, {
        suppressMapOpenBlock: false,
        restrictMapArea: [[85.23618,-178.9], [-73.87011,181]],
    });

    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    // myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
}


/**
 * Функция для рендеринга страницы с картой и пользовательским меню.
 *
 * @async
 * @function
 * @return {void}
 */
export const renderParkingLots = async () => {
    removeMessage();

    const rootElement = document.querySelector('#root');
    rootElement.innerHTML = '';

    rerenderParkingLotsEveryFewSeconds(10);

    renderSideBarMenu();

    ymaps.ready(init);
};


/**
 * Функция для перерисовки парковочных мест каждые несколько секунд.
 *
 * @async
 * @function
 * @param intervalInSeconds - Временной интервал в секундах, через который обновляются парковки.
 * @return {void}
 */
const rerenderParkingLotsEveryFewSeconds = async (intervalInSeconds) => {
    while (true) {
        try {
            const api = new API();
            const isParkings = await api.parkingLots();
            if (isParkings) {
                STORAGE.parking_lots = isParkings.parkingLots;
                drawAllParkingLots(STORAGE.parking_lots);
            }
        } catch (e) {
        if (e.toString() === 'TypeError: Failed to fetch') {
            renderMessage('Потеряно соединение с сервером', true);
        }
        }
        await new Promise(resolve => setTimeout(resolve, intervalInSeconds * 1000));
    }
}


/**
 * Функция для отрисовки всех парковок на карте.
 *
 * @async
 * @function
 * @param parkingLots - Массив, состоящий из JSONов о парковках.
 * @return {void}
 */
const drawAllParkingLots = (parkingLots) => {
  // Переменная с описанием двух видов иконок кластеров.
  let clusterIcons = [
    {
        href: '../../resources/images/cluster.png',
        size: [40, 40],
        // Отступ, чтобы центр картинки совпадал с центром кластера.
        offset: [-20, -20],
        // Можно задать геометрию активной области метки.
        // Если геометрия не задана, активной областью будет
        // прямоугольник.
        shape: {
            type: 'Circle',
            coordinates: [0, 0],
            // Радиус = 0, чтобы нельзя было нажать на кластер
            radius: 0,
         }
    }];

  // Добавление кластеров
  let myClusterer = new ymaps.Clusterer(
    {
      clusterIcons: clusterIcons,
      // Приближение к парковкам при нажатии
      clusterDisableClickZoom: true,
      // Открытие балуна запрещаем
      openBalloonOnClick: false,
    }
  );

  if (parkingLots && parkingLots !== []) {
    for (let index = 0; index < parkingLots.length; ++index) {
      drawParkingLot(parkingLots[index], myClusterer);
    }
    myMap.geoObjects.add(myClusterer);
  }
}


/**
 * Функция для отрисовки одной парковки на карте.
 *
 * @async
 * @function
 * @param parkingLot - JSON о парковке.
 * @param myClusterer - Кластер.
 * @return {void}
 */
const drawParkingLot = (parkingLot, myClusterer) => {
    // Макет содержимого для прогресс-бара
    let ProgressBarLayout = ymaps.templateLayoutFactory.createClass(
        // Количество свободных мест числом
        `<div class="map_placemark">` +
        `$[properties.freePlaces]` +
        `</div>` +
        // Прогресс бар
        '<div class="progressbar">' +
        '<div class="progressbar-fill" style="width: {{ properties.progress }}%;' +
        // Цвет прогресс бара
        'background-color: {{ properties.progressBarColor }};"></div>' +
        '</div>', {
            build: function () {
                ProgressBarLayout.superclass.build.call(this);
            },
            clear: function () {
                ProgressBarLayout.superclass.clear.call(this);
            }
        }
    );

    const lots = countLots(parkingLot.rows);

    const hintContent = parkingLot.address
    const balloonContent = `${parkingLot.address}<br>
                            Количество свободных мест: ${lots.freeLotsCounter}/${lots.allLotsCounter}`;

    const myPlacemark = new ymaps.Placemark(
        parkingLot.coords,
        {
            hintContent: hintContent,
            balloonContent: balloonContent,
            freePlaces: `${lots.freeLotsCounter}`,
            progress: (lots.freeLotsCounter / lots.allLotsCounter) * 100,
            progressBarColor: getProgressBarColor((lots.freeLotsCounter / lots.allLotsCounter) * 100)
        },
        {
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: '../../resources/images/geolocation-new.png',
            // Размеры метки.
            iconImageSize: [50, 50],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-25, -50],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [0, 10],
            // Макет содержимого.
            iconContentLayout: ProgressBarLayout
        }
    );

    myClusterer.add(myPlacemark);

    const parkingRows = parkingLot.rows;
    for (let rowIndex = 0; rowIndex < parkingRows.length; ++rowIndex) {

        // json point = (y, x)
        let A = new Point(parkingRows[rowIndex].coords[0][0], parkingRows[rowIndex].coords[0][1]);
        let B = new Point(parkingRows[rowIndex].coords[1][0], parkingRows[rowIndex].coords[1][1]);
        let C = new Point(parkingRows[rowIndex].coords[2][0], parkingRows[rowIndex].coords[2][1]);

        // H.y = A.y, H.x = B.x
        let H = new Point(A.y, B.x);

        // H'.y = C.y, H'.x = A.x
        let H_s = new Point(C.y, A.x);

        // Коэффициент долготы к широте
        const d = 0.0001
        const noise = 0.000077
        const k_latitude_longitude = (noise + d) / d

        let AH = Math.abs(A.x - H.x);
        let BH = Math.abs(B.y - H.y);
        const AB = Math.sqrt(Math.pow(AH, 2) + Math.pow(BH, 2));
        let AH_s = Math.abs(A.y - H_s.y);
        let CH_s = Math.abs(C.x - H_s.x);
        const AC = Math.sqrt(Math.pow(AH_s, 2) + Math.pow(CH_s, 2));
        const height = AC;

        const alpha = Math.atan(BH / AH);
        const beta = Math.atan(CH_s / AH_s);

        // Направление парковок относительно A
        let direction = 'right';
        if (A.x > B.x) {
            direction = 'left';
        }

        // Угол для расчета ширины и длины парковки
        let BAF_angle = 0;
        if (direction === 'right') {
            if (A.y < B.y) {
                if (A.x < C.x) {
                    BAF_angle = alpha - beta;
                } else {
                    BAF_angle = alpha + beta;
                }
            } else {
                if (A.x < C.x) {
                    throw new Error('Такой ситуации быть не может!');
                } else {
                    BAF_angle = alpha - beta;
                }
            }
        } else if (direction === 'left') {
            if (A.y < B.y) {
                if (A.x < C.x) {
                    BAF_angle = alpha + beta;
                } else {
                    BAF_angle = alpha - beta;
                }
            } else {
                if (A.x < C.x) {
                    BAF_angle = beta - alpha;
                } else {
                    throw new Error('Такой ситуации быть не может!');
                }
            }
        }

        // Ширина ряда
        const AF = AB * Math.cos(BAF_angle);

        // Ширина парковки
        const width = AF / parkingRows[rowIndex].number * 0.95;

        // Сдвиг угла парковки
        const delta = AB / parkingRows[rowIndex].number;
        const deltaX = delta * Math.cos(alpha);
        const deltaY = delta * Math.sin(alpha);

        let point1 = new Point(A.y, A.x);
        let point2 = new Point();
        let point3 = new Point();
        let point4 = new Point();
        let next_point1 = new Point(point1.y, point1.x);

        for (let lotIndex = 0; lotIndex < parkingRows[rowIndex].number; ++lotIndex) {
            if (direction === 'right') {
                if (A.x > C.x) {
                    point2 = new Point(point1.y - width * Math.sin(beta), point1.x + width * Math.cos(beta));
                    point3 = new Point(point2.y - height * Math.cos(beta), point2.x - height * Math.sin(beta));
                    point4 = new Point(point3.y + width * Math.sin(beta), point3.x - width * Math.cos(beta));
                } else {
                    point2 = new Point(point1.y + width * Math.sin(beta), point1.x + width * Math.cos(beta));
                    point3 = new Point(point2.y - height * Math.cos(beta), point2.x + height * Math.sin(beta));
                    point4 = new Point(point3.y - width * Math.sin(beta), point3.x - width * Math.cos(beta));
                }

                if (A.y < B.y) {
                    next_point1.x += deltaX;
                    next_point1.y += deltaY;
                } else {
                    next_point1.x += deltaX;
                    next_point1.y -= deltaY;
                }
            } else if (direction === 'left') {
                if (A.x > C.x) {
                    point2 = new Point(point1.y - height * Math.cos(beta), point1.x - height * Math.sin(beta));
                    point3 = new Point(point2.y + width * Math.sin(beta), point2.x - width * Math.cos(beta));
                    point4 = new Point(point3.y + height * Math.cos(beta), point3.x + height * Math.sin(beta));
                } else {
                    point2 = new Point(point1.y - height * Math.cos(beta), point1.x + height * Math.sin(beta));
                    point3 = new Point(point2.y - width * Math.sin(beta), point2.x - width * Math.cos(beta));
                    point4 = new Point(point3.y + height * Math.cos(beta), point3.x - height * Math.sin(beta));
                }

                if (A.y < B.y) {
                    next_point1.x -= deltaX;
                    next_point1.y += deltaY;
                } else {
                    next_point1.x -= deltaX;
                    next_point1.y -= deltaY;
                }
            }

            const green_color = "rgb(91,243,82)";
            const red_color = "rgb(243,91,82)";
            let color;
            // На сервере нумерация мест начинается с 1
            if (parkingRows[rowIndex].free_spaces.includes(lotIndex + 1)) {
                color = green_color;
            } else {
                color = red_color;
            }
            let rect = drawRect(ymaps, point1, point2, point3, point4, color);
            myMap.geoObjects.add(rect);

            point1.x = next_point1.x;
            point1.y = next_point1.y;
        }
    }
}
