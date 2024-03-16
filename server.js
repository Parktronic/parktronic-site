const express = require('express');
const app = express();

const parkings = [{
        coords: [55.765610, 37.686165],
        address: 'Лефортовская набережная',
        free_lots: {
            right_side: [1, 3],
            left_side: [1]
        },
        all_lots: {
            right_side: {
                number: 26,
                coords: [
                    [55.765408, 37.685846],
                    [55.765906, 37.686216]
                ]
            },
            left_side: {
                number: 24,
                coords: [
                    [55.765316, 37.686098],
                    [55.765845, 37.686505]
                ]
            },
        },
    },
    {
        coords: [55.747165, 37.672475],
        address: 'Съезжинский переулок',
        free_lots: {
            right_side: [1, 3, 5, 7],
            left_side: [2, 4]
        },
        all_lots: {
            right_side: {
                number: 8,
                coords: [
                    [55.747197, 37.672306],
                    [55.747214, 37.672656]
                ]
            },
            left_side: {
                number: 7,
                coords: [
                    [55.747059, 37.672331],
                    [55.747080, 37.672627]
                ]
            },
        },
    }
]

app.get('/get_parkings', (req, res) => {
    res.status(200).json({ parkings });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});