const express = require('express');
const app = express();

const parkings = [{
        id: 19,
        coordinates: [55.765610, 37.686165],
        description: "Best parking",
        city: "Москва",
        street: "Лефортовская набережная",
        house: "5",
        camera: 2,
        rows: [
            {
                coordinates: [[55.028492, 103.204934], [55.204929, 103.203020], [55.201344, 103.345022]],
                capacity: 10,
                free_places: [1, 2]
            },
            {
                coordinates: [[55.028492, 103.204934], [55.204929, 103.203020], [55.201344, 103.345022]],
                capacity: 10,
                free_places: [1, 2]
            },
            {
                coordinates: [[55.028492, 103.204934], [55.204929, 103.203020], [55.201344, 103.345022]],
                capacity: 10,
                free_places: []
            }
        ]
    },
    {
        id: 20,
        coordinates: [55.747165, 37.672475],
        description: "Best parking",
        city: "Москва",
        street: "Съезжинский переулок",
        house: "7",
        camera: 1,
        rows: [
            {
                coordinates: [[55.028492, 103.204934], [55.204929, 103.203020], [55.201344, 103.345022]],
                capacity: 6,
                free_places: [1, 2]
            },
            {
                coordinates: [[55.028492, 103.204934], [55.204929, 103.203020], [55.201344, 103.345022]],
                capacity: 7,
                free_places: [1, 2, 5]
            }
        ]
    }
];

app.get('/get_parkings', (req, res) => {
    res.status(200).json({ parkings });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});